import { WalletConnect } from "@/components/WalletConnect";
import { EncryptedInvoiceCard } from "@/components/EncryptedInvoiceCard";
import { SupplyChainFlow } from "@/components/SupplyChainFlow";
import { FinanceOverview } from "@/components/FinanceOverview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Filter, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const mockInvoices = [
    {
      invoiceId: "INV-2024-001",
      supplier: "Global Components Ltd",
      dueDate: "Jan 15, 2024",
      status: "pending" as const,
      encryptedAmount: "██████.██"
    },
    {
      invoiceId: "INV-2024-002", 
      supplier: "TechParts Solutions",
      dueDate: "Jan 20, 2024",
      status: "approved" as const,
      encryptedAmount: "███████.██"
    },
    {
      invoiceId: "INV-2024-003",
      supplier: "Industrial Materials Co",
      dueDate: "Jan 25, 2024", 
      status: "funded" as const,
      encryptedAmount: "████████.██"
    },
    {
      invoiceId: "INV-2024-004",
      supplier: "Precision Manufacturing",
      dueDate: "Feb 01, 2024", 
      status: "pending" as const,
      encryptedAmount: "█████████.██"
    },
    {
      invoiceId: "INV-2024-005",
      supplier: "Advanced Materials Corp",
      dueDate: "Feb 05, 2024", 
      status: "approved" as const,
      encryptedAmount: "████████.██"
    },
    {
      invoiceId: "INV-2024-006",
      supplier: "Quality Components Inc",
      dueDate: "Feb 10, 2024", 
      status: "funded" as const,
      encryptedAmount: "███████.██"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                Supply Chain Finance Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Wallet Connection */}
          <div className="max-w-md">
            <WalletConnect />
          </div>

          {/* Finance Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Financial Overview</h2>
            <FinanceOverview />
          </div>

          {/* Supply Chain Flow */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Active Supply Chain Operations</h2>
            <SupplyChainFlow />
          </div>

          {/* Invoice Management */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Encrypted Invoice Portfolio</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Total: {mockInvoices.length} invoices</span>
                <span>•</span>
                <span>Pending: {mockInvoices.filter(inv => inv.status === 'pending').length}</span>
                <span>•</span>
                <span>Funded: {mockInvoices.filter(inv => inv.status === 'funded').length}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockInvoices.map((invoice, index) => (
                <EncryptedInvoiceCard key={index} {...invoice} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;