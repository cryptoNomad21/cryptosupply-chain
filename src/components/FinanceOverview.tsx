import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Shield, Clock } from "lucide-react";

export const FinanceOverview = () => {
  const metrics = [
    {
      title: "Available Credit",
      value: "████████",
      actualValue: "$2.4M",
      icon: DollarSign,
      change: "+12.5%",
      encrypted: true
    },
    {
      title: "Active Loans",
      value: "█████",
      actualValue: "23",
      icon: TrendingUp,
      change: "+3",
      encrypted: true
    },
    {
      title: "Privacy Score",
      value: "99.8%",
      icon: Shield,
      change: "+0.2%",
      encrypted: false
    },
    {
      title: "Avg. Settlement",
      value: "█████",
      actualValue: "2.3 days",
      icon: Clock,
      change: "-0.5 days",
      encrypted: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <metric.icon className="h-4 w-4" />
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {metric.encrypted ? (
                <div className="encrypted-text">
                  <p className="text-2xl font-bold font-mono">{metric.value}</p>
                </div>
              ) : (
                <p className="text-2xl font-bold">{metric.value}</p>
              )}
              <p className={`text-xs flex items-center gap-1 ${
                metric.change.startsWith('+') ? 'text-success' : 
                metric.change.startsWith('-') && metric.title !== "Avg. Settlement" ? 'text-destructive' : 'text-success'
              }`}>
                {metric.change} from last month
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};