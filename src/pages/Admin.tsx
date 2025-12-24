import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useWorkers, useCreateWorker, useUpdateWorker, useDeleteWorker } from "@/hooks/useWorkers";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useWorkRequests, useUpdateWorkRequestStatus } from "@/hooks/useWorkRequests";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  Hammer, 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Eye,
  FileText,
  Loader2,
  X
} from "lucide-react";

type Tab = "dashboard" | "products" | "workers" | "orders" | "requests";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useAuth();

  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { data: workers = [], isLoading: loadingWorkers } = useWorkers();
  const { data: orders = [], isLoading: loadingOrders } = useOrders();
  const { data: workRequests = [], isLoading: loadingRequests } = useWorkRequests();
  const { data: categories = [] } = useCategories();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();
  const updateOrderStatus = useUpdateOrderStatus();
  const updateRequestStatus = useUpdateWorkRequestStatus();

  const stats = [
    { label: "Total Revenue", value: `$${orders.reduce((sum, o) => sum + Number(o.total_amount), 0).toLocaleString()}`, change: "+12.5%", icon: DollarSign },
    { label: "Total Orders", value: orders.length.toString(), change: "+8.2%", icon: ShoppingBag },
    { label: "Active Workers", value: workers.filter(w => w.is_available).length.toString(), change: `/${workers.length}`, icon: Users },
    { label: "Products", value: products.length.toString(), change: "items", icon: Package },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" as Tab },
    { icon: Package, label: "Products", tab: "products" as Tab },
    { icon: Users, label: "Workers", tab: "workers" as Tab },
    { icon: ShoppingBag, label: "Orders", tab: "orders" as Tab },
    { icon: FileText, label: "Requests", tab: "requests" as Tab },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": case "delivered": case "accepted": return "bg-green-500/10 text-green-600";
      case "processing": case "shipped": return "bg-blue-500/10 text-blue-600";
      case "pending": return "bg-yellow-500/10 text-yellow-600";
      case "cancelled": case "rejected": return "bg-red-500/10 text-red-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Hammer className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Eye className="w-5 h-5 mr-3" />
              View Site
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={signOut}>
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold capitalize">{activeTab}</h1>
              <p className="text-muted-foreground text-sm">Manage your woodworking business</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-muted-foreground text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("orders")}>View All</Button>
                </CardHeader>
                <CardContent>
                  {loadingOrders ? (
                    <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                  ) : orders.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No orders yet</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                          <div>
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">${Number(order.total_amount).toFixed(2)}</p>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <ProductsManager
              products={products}
              categories={categories}
              workers={workers}
              loading={loadingProducts}
              searchQuery={searchQuery}
              onCreate={createProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          )}

          {/* Workers Tab */}
          {activeTab === "workers" && (
            <WorkersManager
              workers={workers}
              loading={loadingWorkers}
              searchQuery={searchQuery}
              onCreate={createWorker}
              onUpdate={updateWorker}
              onDelete={deleteWorker}
            />
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <OrdersManager
              orders={orders}
              loading={loadingOrders}
              searchQuery={searchQuery}
              onUpdateStatus={updateOrderStatus}
              getStatusColor={getStatusColor}
            />
          )}

          {/* Work Requests Tab */}
          {activeTab === "requests" && (
            <RequestsManager
              requests={workRequests}
              loading={loadingRequests}
              searchQuery={searchQuery}
              onUpdateStatus={updateRequestStatus}
              getStatusColor={getStatusColor}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Products Manager Component
const ProductsManager = ({ products, categories, workers, loading, searchQuery, onCreate, onUpdate, onDelete }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", sale_price: "", category_id: "", worker_id: "",
    images: "", dimensions: "", material: "", stock_quantity: "0", in_stock: true, is_featured: false
  });

  const filtered = products.filter((p: any) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
      category_id: form.category_id || null,
      worker_id: form.worker_id || null,
      images: form.images ? form.images.split(",").map(s => s.trim()) : [],
      dimensions: form.dimensions || null,
      material: form.material || null,
      stock_quantity: parseInt(form.stock_quantity),
      in_stock: form.in_stock,
      is_featured: form.is_featured,
    };

    try {
      if (editingProduct) {
        await onUpdate.mutateAsync({ id: editingProduct.id, ...data });
        toast.success("Product updated");
      } else {
        await onCreate.mutateAsync(data);
        toast.success("Product created");
      }
      setDialogOpen(false);
      resetForm();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", sale_price: "", category_id: "", worker_id: "", images: "", dimensions: "", material: "", stock_quantity: "0", in_stock: true, is_featured: false });
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      sale_price: product.sale_price?.toString() || "",
      category_id: product.category_id || "",
      worker_id: product.worker_id || "",
      images: product.images?.join(", ") || "",
      dimensions: product.dimensions || "",
      material: product.material || "",
      stock_quantity: product.stock_quantity.toString(),
      in_stock: product.in_stock,
      is_featured: product.is_featured,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await onDelete.mutateAsync(id);
      toast.success("Product deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products ({filtered.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price *</Label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Sale Price</Label>
                  <Input type="number" step="0.01" value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Worker</Label>
                  <Select value={form.worker_id} onValueChange={(v) => setForm({ ...form, worker_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {workers.map((w: any) => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Images (comma-separated URLs)</Label>
                <Input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Material</Label>
                  <Input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Dimensions</Label>
                  <Input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity</Label>
                <Input type="number" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} />
                  In Stock
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
                  Featured
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={onCreate.isPending || onUpdate.isPending}>
                {(onCreate.isPending || onUpdate.isPending) ? "Saving..." : (editingProduct ? "Update" : "Create")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((product: any) => (
            <Card key={product.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Package className="w-6 h-6 text-muted-foreground" /></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category?.name || "Uncategorized"}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">${product.price}</p>
                  <Badge variant={product.in_stock ? "default" : "secondary"}>{product.in_stock ? "In Stock" : "Out"}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Workers Manager Component
const WorkersManager = ({ workers, loading, searchQuery, onCreate, onUpdate, onDelete }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<any>(null);
  const [form, setForm] = useState({
    name: "", specialty: "", bio: "", avatar_url: "", phone: "", email: "",
    experience_years: "0", hourly_rate: "", is_available: true, portfolio_images: ""
  });

  const filtered = workers.filter((w: any) => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      specialty: form.specialty,
      bio: form.bio || null,
      avatar_url: form.avatar_url || null,
      phone: form.phone || null,
      email: form.email || null,
      experience_years: parseInt(form.experience_years),
      hourly_rate: form.hourly_rate ? parseFloat(form.hourly_rate) : null,
      is_available: form.is_available,
      portfolio_images: form.portfolio_images ? form.portfolio_images.split(",").map(s => s.trim()) : [],
      user_id: null,
      rating: editingWorker?.rating || 0,
      total_reviews: editingWorker?.total_reviews || 0,
    };

    try {
      if (editingWorker) {
        await onUpdate.mutateAsync({ id: editingWorker.id, ...data });
        toast.success("Worker updated");
      } else {
        await onCreate.mutateAsync(data);
        toast.success("Worker added");
      }
      setDialogOpen(false);
      resetForm();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const resetForm = () => {
    setForm({ name: "", specialty: "", bio: "", avatar_url: "", phone: "", email: "", experience_years: "0", hourly_rate: "", is_available: true, portfolio_images: "" });
    setEditingWorker(null);
  };

  const handleEdit = (worker: any) => {
    setEditingWorker(worker);
    setForm({
      name: worker.name,
      specialty: worker.specialty,
      bio: worker.bio || "",
      avatar_url: worker.avatar_url || "",
      phone: worker.phone || "",
      email: worker.email || "",
      experience_years: worker.experience_years.toString(),
      hourly_rate: worker.hourly_rate?.toString() || "",
      is_available: worker.is_available,
      portfolio_images: worker.portfolio_images?.join(", ") || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this worker?")) {
      await onDelete.mutateAsync(id);
      toast.success("Worker deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Workers ({filtered.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Worker</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingWorker ? "Edit Worker" : "Add Worker"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Specialty *</Label>
                  <Input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Avatar URL</Label>
                <Input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Experience (years)</Label>
                  <Input type="number" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Hourly Rate ($)</Label>
                  <Input type="number" step="0.01" value={form.hourly_rate} onChange={(e) => setForm({ ...form, hourly_rate: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Portfolio Images (comma-separated URLs)</Label>
                <Input value={form.portfolio_images} onChange={(e) => setForm({ ...form, portfolio_images: e.target.value })} />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} />
                Available for Work
              </label>
              <Button type="submit" className="w-full" disabled={onCreate.isPending || onUpdate.isPending}>
                {(onCreate.isPending || onUpdate.isPending) ? "Saving..." : (editingWorker ? "Update" : "Create")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((worker: any) => (
            <Card key={worker.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  {worker.avatar_url ? (
                    <img src={worker.avatar_url} alt={worker.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-serif text-primary">{worker.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{worker.name}</h3>
                  <p className="text-sm text-muted-foreground">{worker.specialty}</p>
                </div>
                <Badge variant={worker.is_available ? "default" : "secondary"}>
                  {worker.is_available ? "Available" : "Busy"}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(worker)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(worker.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Orders Manager Component
const OrdersManager = ({ orders, loading, searchQuery, onUpdateStatus, getStatusColor }: any) => {
  const filtered = orders.filter((o: any) => 
    o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: string) => {
    await onUpdateStatus.mutateAsync({ id, status });
    toast.success("Order status updated");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Orders ({filtered.length})</h2>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No orders found</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((order: any) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">${Number(order.total_amount).toFixed(2)}</p>
                  </div>
                  <Select defaultValue={order.status} onValueChange={(v) => handleStatusChange(order.id, v)}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.product_name} x{item.quantity}</span>
                          <span>${Number(item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Work Requests Manager Component
const RequestsManager = ({ requests, loading, searchQuery, onUpdateStatus, getStatusColor }: any) => {
  const filtered = requests.filter((r: any) => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: string) => {
    await onUpdateStatus.mutateAsync({ id, status });
    toast.success("Request status updated");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Work Requests ({filtered.length})</h2>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No work requests found</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((request: any) => (
            <Card key={request.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{request.name}</p>
                      <Badge variant="secondary">{request.project_type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                    {request.phone && <p className="text-sm text-muted-foreground">{request.phone}</p>}
                    <p className="text-sm mt-2">{request.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      {request.budget_range && <span>Budget: {request.budget_range}</span>}
                      {request.timeline && <span>Timeline: {request.timeline}</span>}
                    </div>
                  </div>
                  <Select defaultValue={request.status} onValueChange={(v) => handleStatusChange(request.id, v)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
