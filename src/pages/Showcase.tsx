import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Filter, Grid, LayoutGrid } from "lucide-react";

const categories = ["All", "Furniture", "Carving", "Decor", "Storage", "Outdoor"];

const works = [
  { id: 1, title: "Rustic Oak Dining Table", category: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", price: "$2,400", likes: 124, artist: "Marcus J." },
  { id: 2, title: "Hand-Carved Wall Art", category: "Carving", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80", price: "$850", likes: 89, artist: "Elena R." },
  { id: 3, title: "Walnut Coffee Table", category: "Furniture", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80", price: "$1,200", likes: 156, artist: "James C." },
  { id: 4, title: "Custom Bookshelf", category: "Storage", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80", price: "$1,800", likes: 67, artist: "Marcus J." },
  { id: 5, title: "Maple Cutting Board Set", category: "Decor", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80", price: "$180", likes: 234, artist: "Sarah M." },
  { id: 6, title: "Garden Bench", category: "Outdoor", image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=600&q=80", price: "$950", likes: 98, artist: "James C." },
  { id: 7, title: "Live Edge Console", category: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", price: "$1,600", likes: 145, artist: "Elena R." },
  { id: 8, title: "Wooden Clock", category: "Decor", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80", price: "$320", likes: 78, artist: "Sarah M." },
];

const Showcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");

  const filteredWorks = activeCategory === "All" 
    ? works 
    : works.filter(work => work.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="section-padding pt-8 pb-12">
          <div className="container-wide mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                Our <span className="text-gradient">Showcase</span>
              </h1>
              <p className="text-muted-foreground text-lg mt-4">
                Browse our collection of handcrafted masterpieces from talented artisans around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 lg:px-8 pb-8">
          <div className="container-wide mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              {/* Layout Toggle */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setLayout("grid")}>
                  <Grid className={`w-4 h-4 ${layout === "grid" ? "text-primary" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setLayout("masonry")}>
                  <LayoutGrid className={`w-4 h-4 ${layout === "masonry" ? "text-primary" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" className="ml-2">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Works Grid */}
        <section className="px-4 lg:px-8">
          <div className="container-wide mx-auto">
            <div className={`grid gap-6 ${
              layout === "grid" 
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {filteredWorks.map((work, index) => (
                <div
                  key={work.id}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                      <Heart className="w-4 h-4 text-foreground hover:text-primary transition-colors" />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                        {work.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">by {work.artist}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-primary font-bold text-lg">{work.price}</span>
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        {work.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Works
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Showcase;
