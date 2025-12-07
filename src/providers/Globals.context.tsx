import {
  createContext,
} from 'react';
import type { Abi } from 'viem';

export type TBlockchain = { chainId: number; address: `0x${string}`, abi: Abi } | null;

export interface IGlobalsContext {
  network?: string | null;
  blockchainConfig: TBlockchain;
  updateGlobals?: (newState: IGlobalsContext) => void;
}

const GlobalsContext = createContext<IGlobalsContext>({
  network: null,
  blockchainConfig: null,
  updateGlobals: () => {},
});

export default GlobalsContext;
