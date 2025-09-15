import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '../../config';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_quantity", "type": "uint256"},
      {"internalType": "uint256", "name": "_unitPrice", "type": "uint256"},
      {"internalType": "address", "name": "_buyer", "type": "address"},
      {"internalType": "uint256", "name": "_deliveryDate", "type": "uint256"}
    ],
    "name": "createSupplyChainItem",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "itemId", "type": "uint256"}],
    "name": "getItemInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "quantity", "type": "uint8"},
      {"internalType": "uint8", "name": "unitPrice", "type": "uint8"},
      {"internalType": "uint8", "name": "totalValue", "type": "uint8"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "bool", "name": "isShipped", "type": "bool"},
      {"internalType": "bool", "name": "isDelivered", "type": "bool"},
      {"internalType": "address", "name": "supplier", "type": "address"},
      {"internalType": "address", "name": "buyer", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "uint256", "name": "deliveryDate", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "itemId", "type": "uint256"}],
    "name": "shipItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "itemId", "type": "uint256"}],
    "name": "deliverItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const useSupplyChainContract = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createItem = async (
    name: string,
    description: string,
    quantity: number,
    unitPrice: number,
    buyer: string,
    deliveryDate: number
  ) => {
    try {
      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createSupplyChainItem',
        args: [name, description, quantity, unitPrice, buyer, deliveryDate],
      });
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  const shipItem = async (itemId: number) => {
    try {
      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'shipItem',
        args: [itemId],
      });
    } catch (err) {
      console.error('Error shipping item:', err);
    }
  };

  const deliverItem = async (itemId: number) => {
    try {
      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'deliverItem',
        args: [itemId],
      });
    } catch (err) {
      console.error('Error delivering item:', err);
    }
  };

  return {
    createItem,
    shipItem,
    deliverItem,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

export const useItemInfo = (itemId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getItemInfo',
    args: [itemId],
  });

  return {
    itemInfo: data,
    isLoading,
    error,
  };
};
