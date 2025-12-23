import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Pick A Padel" className="h-16 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your premier destination for padel. Experience the fastest growing sport in the world at our state-of-the-art facilities.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Book a Court
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@pickapadel.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail size={16} />
                hello@pickapadel.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone size={16} />
                +1 (234) 567-890
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>123 Sports Avenue, Padel District, City 12345</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider">Hours</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Mon - Fri</span>
                <span className="text-foreground">6:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Saturday</span>
                <span className="text-foreground">7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Sunday</span>
                <span className="text-foreground">8:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Pick A Padel. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
