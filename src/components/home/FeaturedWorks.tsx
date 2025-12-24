import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const works = [
  {
    id: 1,
    title: "Rustic Oak Dining Table",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    price: "$2,400",
    likes: 124,
  },
  {
    id: 2,
    title: "Hand-Carved Wall Art",
    category: "Carving",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
    price: "$850",
    likes: 89,
  },
  {
    id: 3,
    title: "Walnut Coffee Table",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    price: "$1,200",
    likes: 156,
  },
  {
    id: 4,
    title: "Custom Bookshelf",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80",
    price: "$1,800",
    likes: 67,
  },
];

const FeaturedWorks = () => {
  return (
    <section className="section-padding bg-card/50">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
              Featured Works
            </h2>
          </div>
          <Link to="/showcase">
            <Button variant="outline" className="group">
              View All Works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-foreground" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium">
                    {work.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                  {work.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-bold">{work.price}</span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {work.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
