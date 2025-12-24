import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MapPin, CheckCircle, Search, Filter, MessageSquare } from "lucide-react";

const specialties = ["All", "Custom Furniture", "Wood Carving", "Restoration", "Cabinetry", "Outdoor"];

const workers = [
  { id: 1, name: "Marcus Johnson", specialty: "Custom Furniture", location: "Portland, OR", rating: 4.9, reviews: 127, hourlyRate: "$85", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", verified: true, available: true, bio: "15+ years crafting bespoke furniture pieces." },
  { id: 2, name: "Elena Rodriguez", specialty: "Wood Carving", location: "Austin, TX", rating: 5.0, reviews: 89, hourlyRate: "$95", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", verified: true, available: true, bio: "Traditional and modern carving techniques." },
  { id: 3, name: "James Chen", specialty: "Restoration", location: "Seattle, WA", rating: 4.8, reviews: 156, hourlyRate: "$75", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", verified: true, available: false, bio: "Breathing new life into antique pieces." },
  { id: 4, name: "Sarah Mitchell", specialty: "Cabinetry", location: "Denver, CO", rating: 4.9, reviews: 203, hourlyRate: "$80", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", verified: true, available: true, bio: "Custom kitchen and bathroom cabinetry specialist." },
  { id: 5, name: "Robert Kim", specialty: "Outdoor", location: "San Diego, CA", rating: 4.7, reviews: 78, hourlyRate: "$70", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", verified: false, available: true, bio: "Weather-resistant outdoor furniture designs." },
  { id: 6, name: "Amanda Foster", specialty: "Custom Furniture", location: "Chicago, IL", rating: 4.9, reviews: 145, hourlyRate: "$90", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", verified: true, available: true, bio: "Modern minimalist designs with natural materials." },
];

const Workers = () => {
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkers = workers.filter(worker => {
    const matchesSpecialty = activeSpecialty === "All" || worker.specialty === activeSpecialty;
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.location.toLowerCase().includes(searchQuery.toLowerCase());
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
                  placeholder="Search by name, skill, or location..."
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
                    variant={activeSpecialty === specialty ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setActiveSpecialty(specialty)}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workers Grid */}
        <section className="px-4 lg:px-8">
          <div className="container-wide mx-auto">
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
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                          {worker.name}
                        </h3>
                        {worker.available ? (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                            Available
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            Busy
                          </span>
                        )}
                      </div>
                      <p className="text-primary text-sm font-medium">{worker.specialty}</p>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                        <MapPin className="w-3 h-3" />
                        {worker.location}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm mt-4">{worker.bio}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-honey fill-honey" />
                      <span className="font-semibold">{worker.rating}</span>
                      <span className="text-muted-foreground text-sm">({worker.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold">{worker.hourlyRate}</span>
                      <span className="text-muted-foreground text-sm">/hour</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredWorkers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No craftsmen found matching your criteria.</p>
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
