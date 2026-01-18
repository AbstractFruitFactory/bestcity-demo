import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useWalletContext } from '../../context/WalletContext';
import Popup from '../common/Popup';

const formatAddress = (address = '') => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const getNetworkLabel = (chainId = '') => {
  const networkMap = {
    '0x1': 'Ethereum',
    '0x5': 'Goerli',
    '0xaa36a7': 'Sepolia',
    '0x89': 'Polygon',
    '0x13881': 'Mumbai',
    '0xa': 'Optimism',
    '0xa4b1': 'Arbitrum',
    '0x38': 'BSC'
  };
  if (!chainId) return 'Unknown';
  return networkMap[chainId] || `Chain ${chainId}`;
};

function Navbar({ isDarkMode, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    address: walletAddress,
    chainId: walletChainId,
    isConnected: isWalletConnected,
    providerAvailable: walletAvailable,
    isConnecting: isWalletConnecting,
    connectWallet: onConnectWallet
  } = useWalletContext();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const handleConnectClick = () => {
    if (!walletAvailable) {
      setShowInstallPrompt(true);
      return;
    }
    onConnectWallet();
  };

  const handleInstallMetaMask = () => {
    setShowInstallPrompt(false);
    window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-white shadow-sm dark:bg-secondary-900 dark:border-b dark:border-secondary-800 md:static fixed top-0 inset-x-0 z-50 h-16 md:h-auto">
      <Popup
        isOpen={showInstallPrompt}
        title="MetaMask not detected"
        description="Install MetaMask to connect your Ethereum wallet."
        primaryLabel="Install MetaMask"
        onPrimary={handleInstallMetaMask}
        onClose={() => setShowInstallPrompt(false)}
      />
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="20" r="10" stroke="#0682ff"/>
                  <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
              </svg>  
              <span className="text-2xl font-bold text-primary-600 mt-1.5">BestCity</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium dark:text-secondary-200 dark:hover:text-primary-400"
              >
                {item.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={onToggleTheme}
              className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium dark:text-secondary-200 dark:hover:text-primary-400"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            {isWalletConnected ? (
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span>{formatAddress(walletAddress)}</span>
                <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-semibold text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">
                  {getNetworkLabel(walletChainId)}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-end">
                <button
                  type="button"
                  className="btn"
                  onClick={handleConnectClick}
                  disabled={isWalletConnecting}
                >
                  {isWalletConnecting ? (
                    <span className="flex items-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Connecting
                    </span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden pr-2">
            <button
              type="button"
              className="text-secondary-600 hover:text-primary-600 dark:text-secondary-200 dark:hover:text-primary-400"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-200 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } dark:bg-secondary-900 dark:border-r dark:border-secondary-800`}
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-secondary-100 dark:border-secondary-800">
              <span className="text-lg font-semibold text-primary-600">Menu</span>
              <button
                type="button"
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-200 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="pt-2 pb-4 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-200 dark:hover:text-primary-400 dark:hover:bg-secondary-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                type="button"
                className="w-full flex items-center rounded-md px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-200 dark:hover:text-primary-400 dark:hover:bg-secondary-800"
                onClick={() => {
                  onToggleTheme();
                }}
              >
                {isDarkMode ? <FiSun size={18} className="mr-2" /> : <FiMoon size={18} className="mr-2" />}
                {isDarkMode ? 'Light mode' : 'Dark mode'}
              </button>
              {isWalletConnected ? (
                <div className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-secondary-700 dark:text-secondary-200">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span>{formatAddress(walletAddress)}</span>
                  <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-semibold text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">
                    {getNetworkLabel(walletChainId)}
                  </span>
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                    onClick={handleConnectClick}
                    disabled={isWalletConnecting}
                  >
                    {isWalletConnecting ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Connecting
                      </span>
                    ) : (
                      'Connect'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;