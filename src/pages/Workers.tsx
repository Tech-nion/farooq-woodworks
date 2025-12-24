import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useWorkers } from "@/hooks/useWorkers";
import { Star, MapPin, CheckCircle, Search, MessageSquare, Loader2, Clock, User } from "lucide-react";

const Workers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const { data: workers = [], isLoading } = useWorkers();

  const specialties = ["all", ...Array.from(new Set(workers.map(w => w.specialty)))];

  const filteredWorkers = workers.filter(worker => {
    const matchesSpecialty = specialtyFilter === "all" || worker.specialty === specialtyFilter;
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (worker.bio || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="section-padding pt-8 pb-12">
          <div className="container-wide mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                Hire <span className="text-gradient">Expert Craftsmen</span>
              </h1>
              <p className="text-muted-foreground text-lg mt-4">
                Connect with skilled woodworkers for your custom projects. From restoration to bespoke furniture.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="px-4 lg:px-8 pb-8">
          <div className="container-wide mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skill, or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {specialties.map(specialty => (
                  <Button
                    key={specialty}
                    variant={specialtyFilter === specialty ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setSpecialtyFilter(specialty)}
                  >
                    {specialty === "all" ? "All" : specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workers Grid */}
        <section className="px-4 lg:px-8">
          <div className="container-wide mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredWorkers.length === 0 ? (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">No craftsmen found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker, index) => (
                  <div
                    key={worker.id}
                    className="group bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        {worker.avatar_url ? (
                          <img
                            src={worker.avatar_url}
                            alt={worker.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl font-serif text-primary font-bold">
                              {worker.name.charAt(0)}
                            </span>
                          </div>
                        )}
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
                        <p className="text-primary text-sm font-medium">{worker.specialty}</p>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                          <Clock className="w-3 h-3" />
                          {worker.experience_years} years exp.
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-muted-foreground text-sm mt-4 line-clamp-2">
                      {worker.bio || "Skilled craftsman specializing in quality woodwork."}
                    </p>

                    {/* Portfolio Preview */}
                    {worker.portfolio_images && worker.portfolio_images.length > 0 && (
                      <div className="flex gap-2 mt-4">
                        {worker.portfolio_images.slice(0, 3).map((img, i) => (
                          <div key={i} className="w-16 h-16 rounded-lg overflow-hidden">
                            <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {worker.portfolio_images.length > 3 && (
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                            +{worker.portfolio_images.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{worker.rating}</span>
                        <span className="text-muted-foreground text-sm">({worker.total_reviews})</span>
                      </div>
                      {worker.hourly_rate && (
                        <div className="text-right">
                          <span className="text-primary font-bold">${worker.hourly_rate}</span>
                          <span className="text-muted-foreground text-sm">/hour</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Link to={`/workers/${worker.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Link to={`/workers/${worker.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Workers;
