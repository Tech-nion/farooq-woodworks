import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Hammer, 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Eye
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Products", active: false },
  { icon: Users, label: "Workers", active: false },
  { icon: ShoppingBag, label: "Orders", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const stats = [
  { label: "Total Revenue", value: "$45,231", change: "+12.5%", icon: DollarSign },
  { label: "Total Orders", value: "1,234", change: "+8.2%", icon: ShoppingBag },
  { label: "Active Workers", value: "48", change: "+3", icon: Users },
  { label: "Page Views", value: "12.5K", change: "+24%", icon: Eye },
];

const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", product: "Oak Dining Table", amount: "$2,400", status: "Completed" },
  { id: "#ORD-002", customer: "Jane Smith", product: "Custom Bookshelf", amount: "$1,800", status: "Processing" },
  { id: "#ORD-003", customer: "Mike Johnson", product: "Walnut Coffee Table", amount: "$1,200", status: "Pending" },
  { id: "#ORD-004", customer: "Sarah Williams", product: "Garden Bench", amount: "$950", status: "Completed" },
  { id: "#ORD-005", customer: "Chris Brown", product: "Cutting Board Set", amount: "$180", status: "Shipped" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/10 text-green-600";
      case "Processing": return "bg-blue-500/10 text-blue-600";
      case "Pending": return "bg-yellow-500/10 text-yellow-600";
      case "Shipped": return "bg-purple-500/10 text-purple-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Hammer className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold">WoodCraft</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.label
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
        
        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="w-5 h-5 mr-3" />
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold">{activeTab}</h1>
              <p className="text-muted-foreground text-sm">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Recent Orders</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-muted-foreground text-sm font-medium">Order ID</th>
                    <th className="text-left p-4 text-muted-foreground text-sm font-medium">Customer</th>
                    <th className="text-left p-4 text-muted-foreground text-sm font-medium">Product</th>
                    <th className="text-left p-4 text-muted-foreground text-sm font-medium">Amount</th>
                    <th className="text-left p-4 text-muted-foreground text-sm font-medium">Status</th>
                    <th className="text-left p-4 text-muted-foreground text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{order.id}</td>
                      <td className="p-4 text-muted-foreground">{order.customer}</td>
                      <td className="p-4">{order.product}</td>
                      <td className="p-4 font-semibold text-primary">{order.amount}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
