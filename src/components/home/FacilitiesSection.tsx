import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Users, Award, Shield, Dumbbell, Wifi } from "lucide-react";
import facility1 from "@/assets/facility-1.jpg";
import facility2 from "@/assets/facility-2.jpg";

const facilities = [
  {
    icon: Zap,
    title: "Premium Courts",
    description: "State-of-the-art courts with professional-grade surfaces and lighting.",
  },
  {
    icon: Users,
    title: "Pro Coaching",
    description: "Expert coaches available for private and group lessons.",
  },
  {
    icon: Award,
    title: "Equipment Rental",
    description: "High-quality rackets and gear available for rent.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Modern facilities with all safety measures in place.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Area",
    description: "Warm-up zone and fitness equipment for players.",
  },
  {
    icon: Wifi,
    title: "Modern Amenities",
    description: "Free WiFi, locker rooms, and refreshment area.",
  },
];

export const FacilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-card">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Facilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mt-4">
            What We <span className="text-gradient-lime">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Experience world-class amenities designed for the ultimate padel experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Images Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src={facility1}
                alt="Padel Court Interior"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src={facility2}
                alt="Padel Equipment"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-background rounded-xl p-6 hover-lift border border-border"
              >
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <facility.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{facility.title}</h3>
                <p className="text-muted-foreground text-sm">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
