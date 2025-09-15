import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Truck, Building, CreditCard } from "lucide-react";

export const SupplyChainFlow = () => {
  const flowSteps = [
    {
      icon: Building,
      title: "Supplier",
      subtitle: "Delivers Goods",
      status: "completed"
    },
    {
      icon: Truck,
      title: "Logistics",
      subtitle: "In Transit",
      status: "active"
    },
    {
      icon: Building,
      title: "Buyer",
      subtitle: "Receives Goods",
      status: "pending"
    },
    {
      icon: CreditCard,
      title: "Payment",
      subtitle: "Invoice Due",
      status: "pending"
    }
  ];

  return (
    <Card className="card-gradient border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Active Supply Chain Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {flowSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  step.status === "completed" 
                    ? "bg-success text-success-foreground" 
                    : step.status === "active"
                    ? "bg-primary text-primary-foreground glow-effect flow-animation"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                </div>
              </div>
              {index < flowSteps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 transition-all duration-500 ${
                    step.status === "completed" 
                      ? "bg-success" 
                      : "bg-muted"
                  }`}>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto -mt-2" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};