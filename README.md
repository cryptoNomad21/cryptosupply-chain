# Crypto Supply Chain

A decentralized supply chain management platform built with FHE (Fully Homomorphic Encryption) for secure and private supply chain operations.

## Features

- **Encrypted Supply Chain Management**: All sensitive data is encrypted using FHE technology
- **Real-time Tracking**: Track items from creation to delivery
- **Secure Payments**: Encrypted payment processing with smart contracts
- **Supplier Verification**: Reputation-based supplier verification system
- **Wallet Integration**: Connect with popular Web3 wallets via RainbowKit

## Technologies

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Smart Contracts**: Solidity with FHE encryption
- **Encryption**: Zama FHEVM for fully homomorphic encryption

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cryptoNomad21/cryptosupply-chain.git
cd cryptosupply-chain
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Configuration

The application uses the following configuration:

- **Chain**: Sepolia testnet (Chain ID: 11155111)
- **RPC URL**: https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
- **Wallet Connect Project ID**: 2ec9743d0d0cd7fb94dee1a7e6d33475

## Smart Contract

The smart contract (`CryptoSupplyChain.sol`) provides:

- Encrypted supply chain item creation
- Invoice generation and payment processing
- Item tracking (shipped/delivered status)
- Supplier verification and reputation system
- FHE-encrypted data storage

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the following environment variables:
   - `NEXT_PUBLIC_CHAIN_ID=11155111`
   - `NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990`
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed_contract_address>`

3. Deploy the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
