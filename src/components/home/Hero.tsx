import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-woodworking.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary/30" />
      <div className="absolute inset-0 opacity-5 bg-wood-pattern" />
      
      <div className="container-wide mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Handcrafted Excellence
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight">
              Where Wood
              <span className="block text-gradient">Meets Artistry</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover master craftsmen who transform raw timber into timeless pieces. 
              From custom furniture to intricate carvings, find the perfect artisan 
              for your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/showcase">
                <Button variant="hero" className="group">
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/workers">
                <Button variant="heroOutline">
                  <Play className="w-5 h-5" />
                  Hire a Craftsman
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              {[{
              value: "150+",
              label: "Craftsmen"
            }, {
              value: "2,500+",
              label: "Projects"
            }, {
              value: "98%",
              label: "Satisfaction"
            }].map(stat => <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-serif font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-slide-in-right" style={{
          animationDelay: "0.2s"
        }}>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-warm">
              <img src={heroImage} alt="Master craftsman working on wood" className="w-full h-full object-cover" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-warm border border-border animate-scale-in" style={{
            animationDelay: "0.5s"
          }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🪵</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Material Quality   </div>
                  <div className="text-xs text-muted-foreground">Sustainably sourced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;