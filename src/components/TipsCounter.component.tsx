import { useContext } from 'react';
import { useReadContract } from 'wagmi';

import { useFetchOnReceived } from '../hooks/useFetchOnReceived.hook';
import GlobalsContext from '../providers/Globals.context';

const TipsCounter = () => {
  const { blockchainConfig = {} } = useContext(GlobalsContext);
  const {
    data: totalTips, isLoading, error, refetch,
  } = useReadContract({
    ...blockchainConfig,
    functionName: 'totalTipsCount',
  });

  useFetchOnReceived({ callback: () => refetch() });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tips count</div>;

  return (
    <div className="tips-counter">
      <h2>Total Tips Received: {totalTips?.toString() || '0'}</h2>
    </div>
  );
};

export default TipsCounter;
