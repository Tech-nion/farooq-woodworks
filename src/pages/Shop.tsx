import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, Star, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Shop = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products = [], isLoading } = useProducts(categoryFilter, searchQuery);
  const { data: categories = [] } = useCategories();
  const { addToCart } = useCart();


  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
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
          <div className="container-wide mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "secondary"}
                size="sm"
                onClick={() => setCategoryFilter("all")}
              >
                All
              </Button>
              {categories.map((category) => (
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
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 lg:px-8">
          <div className="container-wide mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => {
                  const image =
                    product.images?.[0] ||
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
                  const hasDiscount = product.sale_price && product.sale_price < product.price;
                  const displayPrice = product.sale_price || product.price;

                  return (
                    <div
                      key={product.id}
                      className="group bg-card rounded-xl overflow-hidden border border-border hover-lift animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                      <div className="p-5">
                        <p className="text-muted-foreground text-xs uppercase tracking-wider">
                          {product.category?.name || "Uncategorized"}
                        </p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-serif font-semibold text-lg mt-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        {product.worker && (
                          <Link
                            to={`/workers/${product.worker.id}`}
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
                          >
                            By {product.worker.name}
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {product.worker.rating}
                          </Link>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-primary font-bold text-lg">${displayPrice}</span>
                          {hasDiscount && (
                            <span className="text-muted-foreground text-sm line-through">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <Button
                          className="w-full mt-4"
                          disabled={!product.in_stock}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  );
                })}
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
