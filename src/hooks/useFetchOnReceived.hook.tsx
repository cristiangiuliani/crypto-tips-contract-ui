import { useContext } from 'react';
import { useWatchContractEvent } from 'wagmi';

import GlobalsContext from '../providers/Globals.context';

export const useFetchOnReceived = ({ callback = () => {} }) => {
  const { blockchainConfig = {} } = useContext(GlobalsContext);
  useWatchContractEvent({
    ...blockchainConfig,
    eventName: 'TipReceived',
    onLogs() {
      callback();
    },
  });

  return  null;
};
