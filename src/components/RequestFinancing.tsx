import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, DollarSign, Calendar, Building2 } from 'lucide-react';
import { useSupplyChainContract } from '@/hooks/useContract';
import { config } from '../../config';

interface FinancingRequest {
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  buyerAddress: string;
  deliveryDate: string;
  financingAmount: number;
  repaymentTerms: string;
  collateralType: string;
}

export const RequestFinancing: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [request, setRequest] = useState<FinancingRequest>({
    itemName: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    buyerAddress: '',
    deliveryDate: '',
    financingAmount: 0,
    repaymentTerms: '30',
    collateralType: 'inventory'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { createItem, isPending, isConfirming, isConfirmed, error: contractError } = useSupplyChainContract();

  const handleInputChange = (field: keyof FinancingRequest, value: string | number) => {
    setRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotalValue = () => {
    return request.quantity * request.unitPrice;
  };

  const calculateFinancingAmount = () => {
    const totalValue = calculateTotalValue();
    return Math.floor(totalValue * 0.8); // 80% financing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Convert delivery date to timestamp
      const deliveryTimestamp = Math.floor(new Date(request.deliveryDate).getTime() / 1000);
      
      // Create supply chain item with encrypted data
      await createItem(
        request.itemName,
        request.description,
        request.quantity,
        request.unitPrice,
        request.buyerAddress,
        deliveryTimestamp
      );

      // Update financing amount based on calculated value
      setRequest(prev => ({
        ...prev,
        financingAmount: calculateFinancingAmount()
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit financing request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return request.itemName && 
           request.description && 
           request.quantity > 0 && 
           request.unitPrice > 0 && 
           request.buyerAddress && 
           request.deliveryDate;
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Connect Wallet Required</h3>
          <p className="text-muted-foreground">
            Please connect your wallet to request financing for your supply chain items.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Request Supply Chain Financing
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Submit your supply chain item details for encrypted financing. All sensitive data will be encrypted using FHE technology.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Item Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input
                    id="itemName"
                    value={request.itemName}
                    onChange={(e) => handleInputChange('itemName', e.target.value)}
                    placeholder="Enter item name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={request.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the item details"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={request.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      min="1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Unit Price (ETH) *</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.001"
                      value={request.unitPrice}
                      onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.000"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Financing Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Financing Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="buyerAddress">Buyer Address *</Label>
                  <Input
                    id="buyerAddress"
                    value={request.buyerAddress}
                    onChange={(e) => handleInputChange('buyerAddress', e.target.value)}
                    placeholder="0x..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date *</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={request.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repaymentTerms">Repayment Terms (Days)</Label>
                  <Select value={request.repaymentTerms} onValueChange={(value) => handleInputChange('repaymentTerms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collateralType">Collateral Type</Label>
                  <Select value={request.collateralType} onValueChange={(value) => handleInputChange('collateralType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="receivables">Accounts Receivable</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Financing Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Value</p>
                    <p className="font-semibold">{calculateTotalValue().toFixed(3)} ETH</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Financing Amount</p>
                    <p className="font-semibold text-green-600">{calculateFinancingAmount().toFixed(3)} ETH</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Financing Rate</p>
                    <p className="font-semibold">80%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Repayment</p>
                    <p className="font-semibold">{request.repaymentTerms} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {contractError && (
              <Alert variant="destructive">
                <AlertDescription>Contract Error: {contractError.message}</AlertDescription>
              </Alert>
            )}

            {isPending && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>Submitting transaction...</AlertDescription>
              </Alert>
            )}

            {isConfirming && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>Confirming transaction...</AlertDescription>
              </Alert>
            )}

            {isConfirmed && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Financing request submitted successfully! Your data is now encrypted on-chain.
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!isFormValid() || isSubmitting || isPending}
            >
              {isSubmitting || isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Submit Encrypted Financing Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">End-to-End Encryption</h4>
              <p className="text-sm text-blue-700 mt-1">
                All sensitive data including quantities, prices, and financial details are encrypted using 
                Fully Homomorphic Encryption (FHE) before being stored on-chain. Only authorized parties 
                with proper decryption keys can access the encrypted information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
