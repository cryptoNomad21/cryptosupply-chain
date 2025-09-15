# Vercel Deployment Guide for Crypto Supply Chain

This guide provides step-by-step instructions for deploying the Crypto Supply Chain application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step-by-Step Deployment

### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, search for `cryptoNomad21/cryptosupply-chain`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite project

### 3. Configure Project Settings

1. **Project Name**: `crypto-supply-chain` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 4. Set Environment Variables

Click "Environment Variables" and add the following:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Note**: Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with the actual deployed contract address after smart contract deployment.

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Once deployed, you'll receive a URL like `https://crypto-supply-chain-xxx.vercel.app`

### 6. Configure Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click "Settings" tab
3. Click "Domains" in the sidebar
4. Add your custom domain
5. Follow the DNS configuration instructions
6. Wait for SSL certificate to be issued

### 7. Configure Automatic Deployments

1. In project settings, go to "Git" tab
2. Ensure "Production Branch" is set to `main`
3. Enable "Automatic deployments" for production branch
4. Any push to main branch will trigger automatic deployment

## Post-Deployment Configuration

### Smart Contract Deployment

1. Deploy the `CryptoSupplyChain.sol` contract to Sepolia testnet
2. Update the `NEXT_PUBLIC_CONTRACT_ADDRESS` environment variable in Vercel
3. Redeploy the application

### Testing the Deployment

1. Visit your deployed URL
2. Connect a wallet (MetaMask, Rainbow, etc.)
3. Ensure you're on Sepolia testnet
4. Test the basic functionality

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/...` | RPC endpoint for Sepolia |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID |
| `NEXT_PUBLIC_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | `0x...` | Deployed smart contract address |

## Troubleshooting

### Build Failures

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are properly installed
3. Verify TypeScript compilation errors

### Runtime Errors

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure wallet connection is working

### Network Issues

1. Verify RPC URL is accessible
2. Check if Sepolia testnet is available
3. Ensure WalletConnect project ID is valid

## Performance Optimization

1. Enable Vercel Analytics (optional)
2. Configure caching headers for static assets
3. Use Vercel's Edge Functions for API routes (if needed)

## Security Considerations

1. Never commit private keys or sensitive data
2. Use environment variables for all configuration
3. Regularly update dependencies
4. Monitor for security vulnerabilities

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Contact Vercel support if needed

For application issues:
1. Check GitHub issues
2. Review smart contract deployment
3. Verify wallet configuration
