// Environment configuration for Crypto Supply Chain
export const config = {
  // Chain Configuration
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '11155111'), // Sepolia
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
  
  // Wallet Connect Configuration
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID',
  
  // Infura Configuration
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'YOUR_INFURA_API_KEY',
  alternativeRpcUrl: 'https://1rpc.io/sepolia',
  
  // Contract Configuration
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
} as const;
