import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
  const createOrder = useCreateOrder();
  const { user } = useAuth();
  
  const [checkoutForm, setCheckoutForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    try {
      await createOrder.mutateAsync({
        order: {
          user_id: user?.id || null,
          customer_name: checkoutForm.name,
          customer_email: checkoutForm.email,
          customer_phone: checkoutForm.phone,
          shipping_address: checkoutForm.address,
          total_amount: totalAmount,
          status: 'pending',
        },
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.sale_price || item.product.price,
        })),
      });
      
      toast.success('Order placed successfully! We will contact you soon.');
      clearCart();
      setCheckoutForm({ name: '', email: '', phone: '', address: '' });
    } catch {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="section-padding pt-32">
        <div className="container-wide">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          
          <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-serif mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some beautiful woodwork to your cart!</p>
              <Link to="/shop">
                <Button size="lg">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const price = item.product.sale_price || item.product.price;
                  const image = item.product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200';
                  
                  return (
                    <Card key={item.product.id}>
                      <CardContent className="flex gap-4 p-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.product.id}`} className="font-serif font-medium hover:text-primary transition-colors">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.category?.name}</p>
                          <p className="font-bold text-primary mt-1">${price}</p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="flex items-center border border-border rounded">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="font-medium">${(price * item.quantity).toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Checkout */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>${((item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Shipping Address</Label>
                        <Textarea
                          value={checkoutForm.address}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                          placeholder="Enter your full address..."
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg" disabled={createOrder.isPending}>
                        {createOrder.isPending ? 'Processing...' : `Place Order - $${totalAmount.toFixed(2)}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
