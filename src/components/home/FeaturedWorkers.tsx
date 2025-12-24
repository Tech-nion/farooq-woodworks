import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin, CheckCircle } from "lucide-react";

const workers = [
  {
    id: 1,
    name: "Marcus Johnson",
    specialty: "Custom Furniture",
    location: "Portland, OR",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    verified: true,
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    specialty: "Wood Carving",
    location: "Austin, TX",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    verified: true,
  },
  {
    id: 3,
    name: "James Chen",
    specialty: "Restoration",
    location: "Seattle, WA",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    verified: true,
  },
];

const FeaturedWorkers = () => {
  return (
    <section className="section-padding">
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
        <div className="grid md:grid-cols-3 gap-8">
          {workers.map((worker, index) => (
            <div
              key={worker.id}
              className="group bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                    {worker.name}
                  </h3>
                  <p className="text-primary text-sm font-medium">
                    {worker.specialty}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    {worker.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-honey fill-honey" />
                  <span className="font-semibold">{worker.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({worker.reviews})
                  </span>
                </div>
                <Link to={`/workers/${worker.id}`} className="ml-auto">
                  <Button variant="ghost" size="sm" className="group/btn">
                    View Profile
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

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
    </section>
  );
};

export default FeaturedWorkers;
