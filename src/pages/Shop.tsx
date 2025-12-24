import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

const categories = ["All", "Tables", "Chairs", "Storage", "Decor", "Outdoor"];

const products = [
  { id: 1, name: "Artisan Oak Dining Table", category: "Tables", price: 2400, originalPrice: 2800, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", inStock: true, rating: 4.9 },
  { id: 2, name: "Hand-Carved Wall Panel", category: "Decor", price: 850, image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80", inStock: true, rating: 5.0 },
  { id: 3, name: "Walnut Coffee Table", category: "Tables", price: 1200, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80", inStock: true, rating: 4.8 },
  { id: 4, name: "Modular Bookshelf", category: "Storage", price: 1800, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80", inStock: false, rating: 4.7 },
  { id: 5, name: "Maple Cutting Board Set", category: "Decor", price: 180, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80", inStock: true, rating: 4.9 },
  { id: 6, name: "Teak Garden Bench", category: "Outdoor", price: 950, image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=600&q=80", inStock: true, rating: 4.8 },
  { id: 7, name: "Windsor Dining Chair", category: "Chairs", price: 450, image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80", inStock: true, rating: 4.6 },
  { id: 8, name: "Rustic Coat Rack", category: "Storage", price: 280, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80", inStock: true, rating: 4.5 },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number, productName: string) => {
    setCart([...cart, productId]);
    toast.success(`${productName} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="section-padding pt-8 pb-12">
          <div className="container-wide mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                Shop <span className="text-gradient">Handcrafted</span> Pieces
              </h1>
              <p className="text-muted-foreground text-lg mt-4">
                Each piece tells a story. Browse our curated collection of artisan-made woodwork.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="px-4 lg:px-8 pb-8">
          <div className="container-wide mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Categories & Cart */}
              <div className="flex flex-wrap items-center gap-2">
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
                <Button variant="outline" size="sm" className="relative ml-2">
                  <ShoppingCart className="w-4 h-4" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 lg:px-8">
          <div className="container-wide mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                      <Heart className="w-4 h-4 text-foreground hover:text-primary transition-colors" />
                    </button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-xs font-bold">
                          SALE
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">
                      {product.category}
                    </p>
                    <h3 className="font-serif font-semibold text-lg mt-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-primary font-bold text-lg">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground text-sm line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      disabled={!product.inStock}
                      onClick={() => addToCart(product.id, product.name)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
