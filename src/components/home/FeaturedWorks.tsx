import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { ArrowRight, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
const FeaturedWorks = () => {
  const {
    data: products = [],
    isLoading
  } = useProducts();
  const {
    addToCart
  } = useCart();

  // Get featured products or first 4 products
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);
  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  return <section className="section-padding bg-card/50">
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
        {isLoading ? <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div> : displayProducts.length === 0 ? <div className="text-center py-12">
            <p className="text-muted-foreground">No featured works yet. Check back soon!</p>
          </div> : <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, index) => {
          const image = product.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
          const displayPrice = product.sale_price || product.price;
          return <Link to={`/product/${product.id}`} key={product.id} className="group bg-card rounded-xl overflow-hidden border border-border hover-lift animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button onClick={e => handleAddToCart(product, e)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </div>
                    {product.sale_price && <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-xs font-bold">
                          SALE
                        </span>
                      </div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-lg transition-colors text-primary">
                      {product.name}
                    </h3>
                    {product.worker && <p className="text-sm text-muted-foreground mt-1">by {product.worker.name}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">${displayPrice}</span>
                      {product.sale_price && <span className="text-muted-foreground text-sm line-through">${product.price}</span>}
                    </div>
                  </div>
                </Link>;
        })}
          </div>}
      </div>
    </section>;
};
export default FeaturedWorks;