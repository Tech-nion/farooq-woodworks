import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWorker } from '@/hooks/useWorkers';
import { useReviews, useCreateReview } from '@/hooks/useReviews';
import { useCreateWorkRequest } from '@/hooks/useWorkRequests';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { Star, Phone, Mail, Clock, ArrowLeft, CheckCircle, Send, Calendar as CalendarIcon } from 'lucide-react';

const WorkerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading } = useWorker(id || '');
  const { data: reviews = [] } = useReviews(id || '');
  const createReview = useCreateReview();
  const createWorkRequest = useCreateWorkRequest();
  const { user } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '', user_name: '' });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    description: '',
    budget_range: '',
    timeline: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !reviewForm.user_name) return;
    
    try {
      await createReview.mutateAsync({
        worker_id: id,
        user_id: user?.id || null,
        user_name: reviewForm.user_name,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      toast.success('Review submitted successfully!');
      setReviewForm({ rating: 5, comment: '', user_name: '' });
    } catch {
      toast.error('Failed to submit review');
    }
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      await createWorkRequest.mutateAsync({
        worker_id: id,
        user_id: user?.id || null,
        ...contactForm,
      });
      toast.success('Work request submitted! We will contact you soon.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        project_type: '',
        description: '',
        budget_range: '',
        timeline: '',
      });
      setDialogOpen(false);
    } catch {
      toast.error('Failed to submit request');
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

  if (!worker) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-32">
          <div className="container-wide text-center">
            <h1 className="text-2xl font-serif mb-4">Worker not found</h1>
            <Link to="/workers">
              <Button>Back to Workers</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="section-padding pt-32">
        <div className="container-wide">
          <Link to="/workers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Workers
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-secondary mb-4">
                      {worker.avatar_url ? (
                        <img src={worker.avatar_url} alt={worker.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-serif text-primary">
                          {worker.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h1 className="text-2xl font-serif font-bold mb-1">{worker.name}</h1>
                    <Badge variant="secondary" className="text-sm">{worker.specialty}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(worker.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{worker.rating}</span>
                    <span className="text-muted-foreground">({worker.total_reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{worker.experience_years} years experience</span>
                    </div>
                    {worker.hourly_rate && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-4 h-4 text-primary font-bold">$</span>
                        <span>${worker.hourly_rate}/hour</span>
                      </div>
                    )}
                    {worker.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{worker.phone}</span>
                      </div>
                    )}
                    {worker.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{worker.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <Badge variant={worker.is_available ? 'default' : 'secondary'} className="w-full justify-center py-2 mb-4">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {worker.is_available ? 'Available for Work' : 'Currently Busy'}
                  </Badge>
                  
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        <Send className="w-4 h-4 mr-2" />
                        Request Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Request a Quote from {worker.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmitContact} className="space-y-4 mt-4">
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
                          <Label>Project Type</Label>
                          <Select
                            value={contactForm.project_type}
                            onValueChange={(value) => setContactForm({ ...contactForm, project_type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="door">Door</SelectItem>
                              <SelectItem value="kitchen">Kitchen</SelectItem>
                              <SelectItem value="table">Table</SelectItem>
                              <SelectItem value="bed">Bed/Sleeping Cart</SelectItem>
                              <SelectItem value="study">Study Table</SelectItem>
                              <SelectItem value="decor">Wooden Decor</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Project Description</Label>
                          <Textarea
                            value={contactForm.description}
                            onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                            placeholder="Describe your project requirements..."
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Budget Range</Label>
                            <Select
                              value={contactForm.budget_range}
                              onValueChange={(value) => setContactForm({ ...contactForm, budget_range: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
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
                                <SelectValue placeholder="Select timeline" />
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
                        <Button type="submit" className="w-full" disabled={createWorkRequest.isPending}>
                          {createWorkRequest.isPending ? 'Submitting...' : 'Submit Request'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {worker.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {worker.bio || 'No bio available.'}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="portfolio">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {worker.portfolio_images && worker.portfolio_images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {worker.portfolio_images.map((image, index) => (
                            <div key={index} className="aspect-square rounded-lg overflow-hidden">
                              <img src={image} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No portfolio images available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="availability">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        Availability Calendar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border mx-auto"
                        disabled={(date) => date < new Date()}
                      />
                      {selectedDate && (
                        <p className="text-center mt-4 text-muted-foreground">
                          Selected: {selectedDate.toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  {/* Review Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Your Name</Label>
                          <Input
                            value={reviewForm.user_name}
                            onChange={(e) => setReviewForm({ ...reviewForm, user_name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Rating</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-8 h-8 ${star <= reviewForm.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Your Review</Label>
                          <Textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            placeholder="Share your experience..."
                          />
                        </div>
                        <Button type="submit" disabled={createReview.isPending}>
                          {createReview.isPending ? 'Submitting...' : 'Submit Review'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  {/* Reviews List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{review.user_name}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{review.comment}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review!</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkerProfile;
