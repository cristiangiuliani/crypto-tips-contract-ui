import { useContext } from 'react';
import {
  parseEther,
} from 'viem';
import {
  useWriteContract, useWaitForTransactionReceipt,
} from 'wagmi';

import SendTipForm from '../components/SendTipForm.component';
import GlobalsContext, { type IGlobalsContext } from '../providers/Globals.context';

const SendTipFormContainer = () => {
  const { blockchainConfig } : IGlobalsContext = useContext(GlobalsContext);

  const {
    data: hash, writeContract, isPending, error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const sendTransaction = async (amount: number, message: string, isConnected: boolean, callback: () => void) => {
    if (!isConnected || !blockchainConfig?.address || !blockchainConfig?.abi) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      await writeContract({
        address: blockchainConfig.address,
        abi: blockchainConfig.abi,
        functionName: 'sendTip',
        args: [message],
        value: parseEther(amount.toString()),
      });
      callback();
    } catch (err) {
      console.error('Error sending tip:', err);
    }
  };

  return (
    <SendTipForm
      receipt={{
        isSuccess,
        isPending,
        isConfirming,
        error,
        hash,
      }}
      sendTransaction={sendTransaction}
    />
  );
};

export default SendTipFormContainer;
