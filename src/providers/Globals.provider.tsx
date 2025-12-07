import {
  useState, type ReactNode,
} from 'react';

import { NetworksEnum } from '../globals.enum';

import GlobalsContext, { type TBlockchain } from './Globals.context';

export interface IGlobalsProvider {
  network?: string | null;
  blockchainConfig: TBlockchain | null;
}

const getNetworkFromStorage = () => {
  return localStorage.getItem('network');
};

const setNetworkToStorage = (newNetwork?: string | null) => {
  const currentNetwork = getNetworkFromStorage();
  const updatedNetwork = newNetwork || currentNetwork || NetworksEnum.Anvil;
  if (!currentNetwork || currentNetwork !== updatedNetwork) {
    localStorage.setItem('network', updatedNetwork);
  }
};

export const GlobalsProvider = ({
  children,
}: { children: ReactNode }) => {
  const globalsProviderValue = {
    network: getNetworkFromStorage(),
    blockchainConfig: null,
  };
  const [globals, setGlobals] = useState<IGlobalsProvider>(globalsProviderValue);

  const updateGlobals = (newState: IGlobalsProvider = globalsProviderValue) => {
    setNetworkToStorage(newState.network);
    setGlobals((prevState: IGlobalsProvider) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <GlobalsContext.Provider value={{
      ...globals,
      updateGlobals,
    }}
    >
      { children }
    </GlobalsContext.Provider>
  );
};
