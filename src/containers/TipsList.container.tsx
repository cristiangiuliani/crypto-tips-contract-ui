import {
  useContext, useEffect, useState,
} from 'react';
import { formatEther } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

import TipsListComponent from '../components/TipsList.component';
import { useFetchOnReceived } from '../hooks/useFetchOnReceived.hook';
import type { ITip } from '../interfaces/tips.interface';
import GlobalsContext from '../providers/Globals.context';

const TipsListContainer = () => {
  const [tips, setTips] = useState<ITip[]>([]);
  const [loading, setLoading] = useState(true);
  const { blockchainConfig } = useContext(GlobalsContext);

  const { chain } = useAccount();
  const publicClient = usePublicClient({ chainId: chain?.id });

  const fetchTips = async () => {
    if (!publicClient || !blockchainConfig) return;

    try {
      setLoading(true);
      // Get all TipReceived events
      const currentBlock = await publicClient.getBlockNumber();
      const fromBlock = currentBlock - 1000n;

      const logs = await publicClient.getContractEvents({
        address: blockchainConfig.address,
        abi: blockchainConfig.abi,
        eventName: 'TipReceived',
        fromBlock: fromBlock > 0n ? fromBlock : 0n,
        toBlock: 'latest',
      });

      // Parse events into Tip objects
      const parsedTips: ITip[] = logs.map((log) => {
        const {
          sender, amount, message, timestamp,
        } = log.args as {
          sender: string;
          amount: bigint;
          message: string;
          timestamp: bigint;
        };

        return {
          sender,
          amount: formatEther(amount),
          message,
          timestamp: Number(timestamp),
        };
      });

      // Most recent first
      setTips(parsedTips.reverse());
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, [publicClient]);

  useFetchOnReceived({ callback: fetchTips });

  if (loading) return <div>Loading tips...</div>;

  return (
    <TipsListComponent tips={tips} loading={loading} />
  );
};

export default TipsListContainer;
