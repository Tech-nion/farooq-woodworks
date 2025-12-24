import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="relative bg-accent rounded-3xl overflow-hidden">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10 bg-wood-pattern" />
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-accent-foreground max-w-3xl mx-auto">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-accent-foreground/80 text-lg mt-4 max-w-xl mx-auto">
              Whether you're looking for a custom piece or want to join our network 
              of skilled craftsmen, we're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/shop">
                <Button variant="hero" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/workers">
                <Button 
                  variant="heroOutline" 
                  className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10"
                >
                  Become a Craftsman
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
