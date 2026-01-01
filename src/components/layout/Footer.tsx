import { Link } from "react-router-dom";
import { Hammer, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  const whatsappNumber = "923134649629";
  const whatsappMessage = encodeURIComponent("I want more information about your products");

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Hammer className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">Farooq Wood Work</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting skilled craftsmen with those who appreciate the beauty 
              of handcrafted woodwork. Quality meets artistry.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Showcase", "Hire Workers", "Shop", "About Us"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Custom Furniture", "Wood Carving", "Restoration", "Consultation"].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:geekstech29@gmail.com" className="hover:text-primary transition-colors">
                  geekstech29@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:03134649629" className="hover:text-primary transition-colors">0313-4649629</a>
                  <a href="tel:03124415740" className="hover:text-primary transition-colors">0312-4415740</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Gujranwala, Punjab, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Farooq Wood Work. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
