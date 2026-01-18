import { useEffect, useSyncExternalStore } from 'react';
import { investInProperty } from '../utils/contractClient';

let state = {
  totalInvested: '0',
  userInvested: '0',
  contractAddress: '',
  isInvesting: false,
  statusPopup: {
    isOpen: false,
    status: 'loading',
    title: '',
    message: ''
  }
};

const listeners = new Set();
let successTimer = null;

const setState = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};

const setStatusPopup = (popup) => {
  setState({ statusPopup: popup });
};

const scheduleSuccessClose = () => {
  if (successTimer) {
    clearTimeout(successTimer);
  }
  successTimer = setTimeout(() => {
    setStatusPopup({ ...state.statusPopup, isOpen: false });
  }, 3000);
};

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getSnapshot = () => state;

export const showStatus = (payload) => {
  setStatusPopup({ ...payload, isOpen: true });
};

export const closeStatus = () => {
  setStatusPopup({ ...state.statusPopup, isOpen: false });
};

export const loadInvestment = async ({ propertyId, investor }) => {
  try {
    const query = investor ? `?investor=${investor}` : '';
    const response = await fetch(`/api/contract/property/${propertyId}${query}`);
    if (!response.ok) {
      throw new Error('Failed to load investment data');
    }
    const data = await response.json();
    setState({
      contractAddress: data?.contractAddress || '',
      totalInvested: data?.totalInvested || '0',
      userInvested: data?.investorAmount || '0'
    });
  } catch (error) {
    setState({
      contractAddress: '',
      totalInvested: '0',
      userInvested: '0'
    });
  }
};

export const invest = async ({ propertyId, investor, amount }) => {
  setState({ isInvesting: true });
  showStatus({
    status: 'loading',
    title: 'Processing your investment',
    message: 'Please confirm the transaction in your wallet.'
  });
  try {
    await investInProperty({
      contractAddress: state.contractAddress,
      propertyId,
      investor,
      amount
    });
    showStatus({
      status: 'success',
      title: 'Investment successful',
      message: 'Thanks for investing. Your contribution will appear shortly.'
    });
    setState({
      totalInvested: (Number(state.totalInvested) + Number(amount)).toString(),
      userInvested: (Number(state.userInvested) + Number(amount)).toString()
    });
    scheduleSuccessClose();
  } catch (error) {
    showStatus({
      status: 'error',
      title: 'Transaction failed',
      message: error?.message || 'Please try again or check your wallet.'
    });
  } finally {
    setState({ isInvesting: false });
  }
};

export const useContractStore = ({ propertyId, investor }) => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    if (!propertyId) {
      return undefined;
    }
    loadInvestment({ propertyId, investor });
    return undefined;
  }, [propertyId, investor]);

  return {
    ...snapshot,
    loadInvestment,
    invest,
    showStatus,
    closeStatus
  };
};
