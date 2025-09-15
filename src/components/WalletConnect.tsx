import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Building2 } from "lucide-react";

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Card className="card-gradient border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Shield className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Business Wallet Connected</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/20 glow-effect">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Connect Business Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Securely connect your business wallet to access encrypted supply chain financing
            </p>
          </div>
          <ConnectButton />
        </div>
      </CardContent>
    </Card>
  );
};