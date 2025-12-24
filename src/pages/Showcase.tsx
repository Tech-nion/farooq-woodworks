import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useGallery } from "@/hooks/useGallery";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Heart, Grid, LayoutGrid, Loader2, Image as ImageIcon } from "lucide-react";

const Showcase = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");
  const { data: gallery = [], isLoading: loadingGallery } = useGallery(categoryFilter);
  const { data: products = [], isLoading: loadingProducts } = useProducts(categoryFilter);
  const { data: categories = [] } = useCategories();

  // Combine gallery and featured products for showcase
  const showcaseItems = [
    ...gallery.map(item => ({
      id: item.id,
      type: 'gallery' as const,
      title: item.title,
      category: item.category?.name || "Uncategorized",
      image: item.image_url,
      description: item.description,
    })),
    ...products.filter(p => p.is_featured).map(item => ({
      id: item.id,
      type: 'product' as const,
      title: item.name,
      category: item.category?.name || "Uncategorized",
      image: item.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      price: item.sale_price || item.price,
      worker: item.worker?.name,
    })),
  ];

  const loading = loadingGallery || loadingProducts;

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
                Browse our collection of handcrafted masterpieces from talented artisans.
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
                <Button
                  variant={categoryFilter === "all" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setCategoryFilter("all")}
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={categoryFilter === category.id ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setCategoryFilter(category.id)}
                  >
                    {category.name}
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
              </div>
            </div>
          </div>
        </section>

        {/* Works Grid */}
        <section className="px-4 lg:px-8">
          <div className="container-wide mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : showcaseItems.length === 0 ? (
              <div className="text-center py-16">
                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">No items in showcase</h3>
                <p className="text-muted-foreground mb-6">Check back soon for new masterpieces!</p>
                <Link to="/shop">
                  <Button>Browse Shop</Button>
                </Link>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                layout === "grid" 
                  ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}>
                {showcaseItems.map((item, index) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.type === 'product' ? (
                      <Link to={`/product/${item.id}`}>
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button 
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Heart className="w-4 h-4 text-foreground hover:text-primary transition-colors" />
                          </button>
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {item.worker && (
                            <p className="text-muted-foreground text-sm mt-1">by {item.worker}</p>
                          )}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                            <span className="text-primary font-bold text-lg">${item.price}</span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                            <Heart className="w-4 h-4 text-foreground hover:text-primary transition-colors" />
                          </button>
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{item.description}</p>
                          )}
                        </div>
                      </>
                    )}
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

export default Showcase;
