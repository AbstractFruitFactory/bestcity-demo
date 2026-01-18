import { useEffect, useState } from 'react';

const initialState = {
  address: '',
  chainId: '',
  isConnected: false,
  providerAvailable: false,
  error: '',
  isConnecting: false
};

const getProvider = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.ethereum || null;
};

export const useWallet = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const provider = getProvider();
    setState((prev) => ({
      ...prev,
      providerAvailable: Boolean(provider)
    }));
    if (!provider) {
      return;
    }

    const handleAccountsChanged = (accounts) => {
      const address = accounts?.[0] || '';
      setState((prev) => ({
        ...prev,
        address,
        isConnected: Boolean(address),
        error: ''
      }));
    };

    const handleChainChanged = (chainId) => {
      setState((prev) => ({
        ...prev,
        chainId
      }));
    };

    provider.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(() => {
      setState((prev) => ({
        ...prev,
        error: 'Failed to read accounts'
      }));
    });

    provider.request({ method: 'eth_chainId' }).then(handleChainChanged).catch(() => {
      setState((prev) => ({
        ...prev,
        error: 'Failed to read chain'
      }));
    });

    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('chainChanged', handleChainChanged);

    return () => {
      provider.removeListener('accountsChanged', handleAccountsChanged);
      provider.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) {
      setState((prev) => ({
        ...prev,
        providerAvailable: false,
        error: 'MetaMask not detected'
      }));
      return;
    }

    try {
      setState((prev) => ({
        ...prev,
        isConnecting: true,
        error: ''
      }));
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const chainId = await provider.request({ method: 'eth_chainId' });
      const address = accounts?.[0] || '';
      setState((prev) => ({
        ...prev,
        address,
        chainId,
        isConnected: Boolean(address),
        providerAvailable: true,
        error: '',
        isConnecting: false
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error?.message || 'Failed to connect wallet',
        isConnecting: false
      }));
    }
  };

  const resetWallet = () => {
    setState((prev) => ({
      ...prev,
      address: '',
      chainId: '',
      isConnected: false,
      error: '',
      isConnecting: false
    }));
  };

  return {
    ...state,
    connectWallet,
    resetWallet
  };
};
