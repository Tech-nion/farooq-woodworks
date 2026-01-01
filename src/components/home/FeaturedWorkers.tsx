import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkers } from "@/hooks/useWorkers";
import { ArrowRight, Star, Clock, CheckCircle, Loader2 } from "lucide-react";
const FeaturedWorkers = () => {
  const {
    data: workers = [],
    isLoading
  } = useWorkers();

  // Get top 3 workers by rating
  const featuredWorkers = workers.slice(0, 3);
  return <section className="section-padding text-primary">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Expert Craftsmen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
            Meet Our Artisans
          </h2>
          <p className="text-muted-foreground mt-4">
            Skilled professionals ready to bring your vision to life with 
            decades of combined experience.
          </p>
        </div>

        {/* Workers Grid */}
        {isLoading ? <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div> : featuredWorkers.length === 0 ? <div className="text-center py-12">
            <p className="text-muted-foreground">No craftsmen available yet.</p>
          </div> : <div className="grid md:grid-cols-3 gap-8">
            {featuredWorkers.map((worker, index) => <div key={worker.id} className="group bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {worker.avatar_url ? <img src={worker.avatar_url} alt={worker.name} className="w-16 h-16 rounded-xl object-cover" /> : <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-serif text-primary font-bold">
                          {worker.name.charAt(0)}
                        </span>
                      </div>}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                        {worker.name}
                      </h3>
                      <Badge variant={worker.is_available ? "default" : "secondary"} className="text-xs">
                        {worker.is_available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                    <p className="text-primary text-sm font-medium">
                      {worker.specialty}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                      <Clock className="w-3 h-3" />
                      {worker.experience_years} years experience
                    </div>
                  </div>
                </div>

                {/* Bio snippet */}
                {worker.bio && <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                    {worker.bio}
                  </p>}

                {/* Portfolio preview */}
                {worker.portfolio_images && worker.portfolio_images.length > 0 && <div className="flex gap-2 mt-4">
                    {worker.portfolio_images.slice(0, 3).map((img, i) => <div key={i} className="w-14 h-14 rounded-lg overflow-hidden">
                        <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover" />
                      </div>)}
                  </div>}

                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{worker.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({worker.total_reviews})
                    </span>
                  </div>
                  {worker.hourly_rate && <span className="text-sm text-muted-foreground">
                      ${worker.hourly_rate}/hr
                    </span>}
                  <Link to={`/workers/${worker.id}`} className="ml-auto">
                    <Button variant="ghost" size="sm" className="group/btn">
                      View Profile
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>)}
          </div>}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/workers">
            <Button variant="outline" size="lg" className="group">
              Browse All Craftsmen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default FeaturedWorkers;