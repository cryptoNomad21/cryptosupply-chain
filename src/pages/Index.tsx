import { Button } from "@/components/ui/button";
import { Shield, Eye, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/supply-chain-hero.jpg";

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-success bg-clip-text text-transparent">
              Finance Supply Chains, Privately
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Suppliers borrow against invoices with encrypted amounts, protecting competitive terms through advanced cryptographic privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="glow-effect">
                  <Zap className="h-5 w-5 mr-2" />
                  Access Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Eye className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/20 w-16 h-16 mx-auto flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Encrypted Amounts</h3>
              <p className="text-muted-foreground">Invoice amounts remain encrypted, protecting competitive pricing information.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="p-4 rounded-full bg-success/20 w-16 h-16 mx-auto flex items-center justify-center">
                <Zap className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Instant Liquidity</h3>
              <p className="text-muted-foreground">Access working capital immediately against verified supply chain flows.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="p-4 rounded-full bg-encrypted/20 w-16 h-16 mx-auto flex items-center justify-center">
                <Eye className="h-8 w-8 text-encrypted" />
              </div>
              <h3 className="text-xl font-semibold">Private by Design</h3>
              <p className="text-muted-foreground">Zero-knowledge proofs ensure transaction privacy without compromising security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Ready to Secure Your Supply Chain?</h2>
              <p className="text-muted-foreground text-lg">
                Join leading companies using encrypted supply chain finance to protect competitive advantages while accessing instant liquidity.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="glow-effect">
                  <Zap className="h-5 w-5 mr-2" />
                  Launch Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/50">
              <div className="text-center space-y-2">
                <h4 className="font-semibold">Enterprise Grade</h4>
                <p className="text-sm text-muted-foreground">Bank-level security with zero-knowledge proofs</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold">Global Network</h4>
                <p className="text-sm text-muted-foreground">Connected to major supply chain partners worldwide</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">Round-the-clock technical and financial support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Encrypted Supply Chain Finance. Privacy-first financial infrastructure.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;