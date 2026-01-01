import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';

interface QuoteRequestDialogProps {
  trigger?: React.ReactNode;
}

const QuoteRequestDialog = ({ trigger }: QuoteRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    productType: '',
    size: '',
    quantity: '1',
    material: '',
    details: '',
  });

  const whatsappNumber = "923134649629";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Quote Request*
    
👤 *Name:* ${formData.name}
📦 *Product Type:* ${formData.productType}
📏 *Size/Dimensions:* ${formData.size}
🔢 *Quantity:* ${formData.quantity}
🪵 *Preferred Material:* ${formData.material || 'Not specified'}

📝 *Additional Details:*
${formData.details || 'None'}

I would like to get a quote for this custom order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    setOpen(false);
    setFormData({
      name: '',
      productType: '',
      size: '',
      quantity: '1',
      material: '',
      details: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="default">Get Quote</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Request a Quote</DialogTitle>
          <DialogDescription>
            Fill in the details below and we'll send your request directly to WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productType">Product Type *</Label>
            <Select
              value={formData.productType}
              onValueChange={(value) => setFormData({ ...formData, productType: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Door">Door</SelectItem>
                <SelectItem value="Window">Window</SelectItem>
                <SelectItem value="Cabinet">Cabinet</SelectItem>
                <SelectItem value="Table">Table</SelectItem>
                <SelectItem value="Chair">Chair</SelectItem>
                <SelectItem value="Bed Frame">Bed Frame</SelectItem>
                <SelectItem value="Wardrobe">Wardrobe</SelectItem>
                <SelectItem value="Decorative Item">Decorative Item</SelectItem>
                <SelectItem value="Custom Carving">Custom Carving</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size/Dimensions *</Label>
              <Input
                id="size"
                placeholder="e.g., 6ft x 4ft"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Preferred Wood/Material</Label>
            <Select
              value={formData.material}
              onValueChange={(value) => setFormData({ ...formData, material: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sheesham (Rosewood)">Sheesham (Rosewood)</SelectItem>
                <SelectItem value="Deodar (Cedar)">Deodar (Cedar)</SelectItem>
                <SelectItem value="Teak">Teak</SelectItem>
                <SelectItem value="Mahogany">Mahogany</SelectItem>
                <SelectItem value="Oak">Oak</SelectItem>
                <SelectItem value="Pine">Pine</SelectItem>
                <SelectItem value="Walnut">Walnut</SelectItem>
                <SelectItem value="Mango Wood">Mango Wood</SelectItem>
                <SelectItem value="Not Sure">Not Sure - Need Advice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              placeholder="Describe any specific requirements, design preferences, or questions..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Quote Request via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestDialog;
