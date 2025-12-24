import React, { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { useCategories } from '@/hooks/useCategories';
import { useWorkers } from '@/hooks/useWorkers';
import { useCreateWorkRequest } from '@/hooks/useWorkRequests';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Search, Clock, DollarSign, User, Send, Wrench } from 'lucide-react';

const Services = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { data: services = [], isLoading } = useServices(categoryFilter, search);
  const { data: categories = [] } = useCategories();
  const { data: workers = [] } = useWorkers();
  const createWorkRequest = useCreateWorkRequest();
  const { user } = useAuth();
  
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    budget_range: '',
    timeline: '',
    worker_id: '',
  });

  const handleSubmitRequest = async (e: React.FormEvent, serviceName: string) => {
    e.preventDefault();
    if (!contactForm.worker_id) {
      toast.error('Please select a worker');
      return;
    }
    
    try {
      await createWorkRequest.mutateAsync({
        worker_id: contactForm.worker_id,
        user_id: user?.id || null,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        project_type: serviceName,
        description: contactForm.description,
        budget_range: contactForm.budget_range,
        timeline: contactForm.timeline,
      });
      toast.success('Service request submitted! We will contact you soon.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        description: '',
        budget_range: '',
        timeline: '',
        worker_id: '',
      });
      setDialogOpen(false);
    } catch {
      toast.error('Failed to submit request');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="section-padding pt-32">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Wrench className="w-3 h-3 mr-1" />
              Our Services
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Custom Woodworking Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From custom furniture to complete renovations, our master craftsmen bring your vision to life with precision and artistry.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Services Grid */}
          {isLoading ? (
            <div className="text-center py-12">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif mb-2">No services found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover-lift border-border/50">
                  <CardHeader>
                    {service.category && (
                      <Badge variant="secondary" className="w-fit mb-2">{service.category.name}</Badge>
                    )}
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold">
                          From ${service.min_price}
                          {service.max_price && ` - $${service.max_price}`}
                        </span>
                      </div>
                    </div>
                    
                    {service.duration_days && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Estimated: {service.duration_days} days</span>
                      </div>
                    )}
                    
                    {service.worker && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <User className="w-4 h-4" />
                        <span>By {service.worker.name}</span>
                      </div>
                    )}
                    
                    <Dialog open={dialogOpen && selectedService === service.id} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (open) setSelectedService(service.id);
                    }}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Request This Service
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Request: {service.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleSubmitRequest(e, service.name)} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Select Worker</Label>
                            <Select
                              value={contactForm.worker_id}
                              onValueChange={(value) => setContactForm({ ...contactForm, worker_id: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a craftsman" />
                              </SelectTrigger>
                              <SelectContent>
                                {workers.filter(w => w.is_available).map((worker) => (
                                  <SelectItem key={worker.id} value={worker.id}>
                                    {worker.name} - {worker.specialty}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Your Name</Label>
                              <Input
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Phone</Label>
                              <Input
                                value={contactForm.phone}
                                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Project Details</Label>
                            <Textarea
                              value={contactForm.description}
                              onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                              placeholder="Describe your requirements..."
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Budget</Label>
                              <Select
                                value={contactForm.budget_range}
                                onValueChange={(value) => setContactForm({ ...contactForm, budget_range: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Budget" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="under-500">Under $500</SelectItem>
                                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                                  <SelectItem value="5000+">$5,000+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Timeline</Label>
                              <Select
                                value={contactForm.timeline}
                                onValueChange={(value) => setContactForm({ ...contactForm, timeline: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Timeline" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="asap">ASAP</SelectItem>
                                  <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
                                  <SelectItem value="1-month">1 Month</SelectItem>
                                  <SelectItem value="flexible">Flexible</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Minimum payment: <span className="font-medium text-primary">${service.min_price}</span>
                          </p>
                          <Button type="submit" className="w-full" disabled={createWorkRequest.isPending}>
                            {createWorkRequest.isPending ? 'Submitting...' : 'Submit Request'}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
