import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, FileText, DollarSign } from "lucide-react";
import { useState } from "react";

interface EncryptedInvoiceCardProps {
  invoiceId: string;
  supplier: string;
  dueDate: string;
  status: "pending" | "approved" | "funded";
  encryptedAmount: string;
  actualAmount?: string;
}

export const EncryptedInvoiceCard = ({ 
  invoiceId, 
  supplier, 
  dueDate, 
  status, 
  encryptedAmount,
  actualAmount = "$45,280.00"
}: EncryptedInvoiceCardProps) => {
  const [showAmount, setShowAmount] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-success bg-success/20";
      case "funded": return "text-primary bg-primary/20";
      default: return "text-warning bg-warning/20";
    }
  };

  return (
    <Card className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Invoice #{invoiceId}
          </CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Supplier</p>
            <p className="font-medium">{supplier}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium">{dueDate}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Invoice Amount</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAmount(!showAmount)}
              className="h-6 w-6 p-0"
            >
              {showAmount ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
          </div>
          
          <div className="relative">
            {showAmount ? (
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="font-mono font-bold text-success">{actualAmount}</span>
              </div>
            ) : (
              <div className="encrypted-text p-3 bg-encrypted/10 rounded-lg border border-encrypted/20">
                <span className="font-mono text-encrypted/80">{encryptedAmount}</span>
              </div>
            )}
          </div>
        </div>

        {status === "pending" && (
          <Button size="sm" className="w-full">
            Request Financing
          </Button>
        )}
        
        {status === "approved" && (
          <Button size="sm" className="w-full" variant="outline">
            Accept Terms
          </Button>
        )}
      </CardContent>
    </Card>
  );
};