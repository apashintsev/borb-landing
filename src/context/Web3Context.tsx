import React, { createContext, useContext, ReactNode } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { Web3ProviderState, initialState } from "../store/reducers/web3Slice";

const Web3Context = createContext<Web3ProviderState>(initialState);

interface Props {
  children: ReactNode;
}

export const Web3ContextProvider = ({ children }: Props) => {
  const web3ProviderState = useWeb3();

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  return useContext(Web3Context);
}
