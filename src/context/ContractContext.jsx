import { createContext, useContext, useMemo, useState } from 'react';
import { useContractStore } from '../store/contractStore';

const ContractContext = createContext(null);

export const ContractProvider = ({ children }) => {
  const [scope, setScope] = useState({ propertyId: '', investor: '' });
  const store = useContractStore(scope);

  const value = useMemo(
    () => ({
      ...store,
      setContractScope: setScope
    }),
    [store]
  );

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContractContext must be used within ContractProvider');
  }
  return context;
};
