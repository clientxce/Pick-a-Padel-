import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@pickapadel.com",
    href: "mailto:hello@pickapadel.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Sports Avenue, Padel District, City 12345",
    href: "#",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Sun: 6AM - 10PM",
    href: "#",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mt-4">
              Contact <span className="text-gradient-lime">Us</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 md:p-10 border border-border"
            >
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="bg-card rounded-xl p-6 border border-border hover-lift group"
                  >
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <info.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.value}</p>
                  </a>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50" />
                  <div className="relative text-center p-8">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Sports Avenue
                      <br />
                      Padel District, City 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                <h3 className="font-bold text-primary mb-2">Quick Response</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24 hours. For urgent inquiries, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
