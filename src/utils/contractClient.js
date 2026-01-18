import { ethers } from 'ethers';
import contractArtifact from '../abi/Contract.json';

const contractAbi = contractArtifact?.abi || [];

export const getPropertyKey = (propertyId) => {
  if (!propertyId) {
    throw new Error('Property id is required');
  }
  return ethers.BigNumber.from(`0x${propertyId}`);
};

export const getWeb3Provider = () => {
  if (!window?.ethereum) {
    throw new Error('MetaMask not detected');
  }
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getContractWithSigner = (contractAddress) => {
  if (!contractAddress) {
    throw new Error('Contract address is missing');
  }
  const provider = getWeb3Provider();
  return new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
};

export const investInProperty = async ({ contractAddress, propertyId, investor, amount }) => {
  const contract = getContractWithSigner(contractAddress);
  const propertyKey = getPropertyKey(propertyId);
  const tx = await contract.invest(propertyKey, investor, ethers.BigNumber.from(amount));
  return tx.hash;
};
