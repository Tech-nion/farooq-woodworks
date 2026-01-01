import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, ShoppingCart, Minus, Plus, Star, Ruler, Package, User, MessageCircle } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const whatsappNumber = "923134649629";
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(`I want more information about this product: ${product?.name}`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-32">
          <div className="container-wide text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-32">
          <div className="container-wide text-center">
            <h1 className="text-2xl font-serif mb-4">Product not found</h1>
            <Link to="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'];
  
  const displayPrice = product.sale_price || product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="section-padding pt-32">
        <div className="container-wide">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.category && (
                  <Badge variant="secondary" className="mb-3">{product.category.name}</Badge>
                )}
                <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">{product.name}</h1>
                
                {product.worker && (
                  <Link to={`/workers/${product.worker.id}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <User className="w-4 h-4" />
                    Crafted by {product.worker.name}
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{product.worker.rating}</span>
                    </div>
                  </Link>
                )}
              </div>
              
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">${displayPrice}</span>
                {hasDiscount && (
                  <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                )}
                {hasDiscount && (
                  <Badge variant="destructive">
                    {Math.round((1 - product.sale_price! / product.price) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {product.description || 'No description available.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {product.material && (
                  <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Material</p>
                        <p className="font-medium">{product.material}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {product.dimensions && (
                  <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                      <Ruler className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Dimensions</p>
                        <p className="font-medium">{product.dimensions}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant={product.in_stock ? 'default' : 'destructive'}>
                  {product.in_stock ? `In Stock (${product.stock_quantity})` : 'Out of Stock'}
                </Badge>
              </div>
              
              {product.in_stock && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      disabled={quantity >= product.stock_quantity}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <Button onClick={handleAddToCart} size="lg" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart - ${(displayPrice * quantity).toFixed(2)}
                  </Button>
                </div>
              )}
              
              {/* WhatsApp Contact Button */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Ask About This Product on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
