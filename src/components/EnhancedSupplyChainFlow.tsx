import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package, Truck, Building, CreditCard, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

export const EnhancedSupplyChainFlow = () => {
  const flowSteps = [
    {
      icon: FileText,
      title: "Purchase Order",
      subtitle: "Order Placed",
      description: "Buyer places encrypted purchase order",
      status: "completed",
      timestamp: "Dec 28, 2023"
    },
    {
      icon: Package,
      title: "Production",
      subtitle: "Manufacturing",
      description: "Supplier begins production process",
      status: "completed",
      timestamp: "Jan 02, 2024"
    },
    {
      icon: CheckCircle,
      title: "Quality Check",
      subtitle: "QC Passed",
      description: "Quality assurance verification complete",
      status: "completed",
      timestamp: "Jan 08, 2024"
    },
    {
      icon: Truck,
      title: "Logistics",
      subtitle: "In Transit",
      description: "Goods shipped via encrypted tracking",
      status: "active",
      timestamp: "Jan 10, 2024"
    },
    {
      icon: Building,
      title: "Delivery",
      subtitle: "Pending Receipt",
      description: "Awaiting delivery confirmation",
      status: "pending",
      timestamp: "Expected: Jan 15, 2024"
    },
    {
      icon: FileText,
      title: "Invoice",
      subtitle: "Invoice Sent",
      description: "Encrypted invoice submitted for financing",
      status: "pending",
      timestamp: "Pending delivery"
    },
    {
      icon: CreditCard,
      title: "Payment",
      subtitle: "Financing",
      description: "Private financing request processing",
      status: "pending",
      timestamp: "Pending approval"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-3 w-3" />;
      case "active": return <Clock className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success bg-success/20";
      case "active": return "text-primary bg-primary/20";
      default: return "text-warning bg-warning/20";
    }
  };

  return (
    <Card className="card-gradient border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Complete Supply Chain Flow</CardTitle>
          <Badge variant="outline" className="text-xs">
            Order #PO-2024-0157
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Timeline */}
          <div className="relative">
            <div className="flex justify-between items-center mb-8">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center space-y-3 relative z-10">
                  {/* Step Circle */}
                  <div className={`p-3 rounded-full transition-all duration-300 ${
                    step.status === "completed" 
                      ? "bg-success text-success-foreground" 
                      : step.status === "active"
                      ? "bg-primary text-primary-foreground glow-effect flow-animation"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  
                  {/* Step Info */}
                  <div className="text-center max-w-24">
                    <p className="text-xs font-medium leading-tight">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-6 left-8 right-8 h-0.5 bg-muted -z-10">
              <div 
                className="h-full bg-gradient-to-r from-success via-success to-primary transition-all duration-1000"
                style={{ width: "45%" }}
              />
            </div>
          </div>

          {/* Detailed Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flowSteps.slice(-3).map((step, index) => (
              <Card key={index} className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      step.status === "completed" 
                        ? "bg-success/20 text-success" 
                        : step.status === "active"
                        ? "bg-primary/20 text-primary"
                        : "bg-warning/20 text-warning"
                    }`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <Badge className={`${getStatusColor(step.status)} text-xs`}>
                          {getStatusIcon(step.status)}
                          <span className="ml-1">{step.status}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                      <p className="text-xs font-mono text-muted-foreground">{step.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Lead Time</p>
              <p className="font-semibold">18 days</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="font-semibold">57%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Privacy Score</p>
              <p className="font-semibold text-success">99.8%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className="font-semibold text-primary">Low</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};