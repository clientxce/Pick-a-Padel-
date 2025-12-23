import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Select Date",
    description: "Choose your preferred date from our availability calendar.",
  },
  {
    icon: Clock,
    title: "Pick Time Slot",
    description: "Select from available time slots that fit your schedule.",
  },
  {
    icon: CreditCard,
    title: "Confirm Booking",
    description: "Complete your reservation with secure online payment.",
  },
  {
    icon: CheckCircle,
    title: "Play Padel",
    description: "Show up and enjoy your game on our premium courts.",
  },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mt-4">
            How <span className="text-gradient-lime">Booking Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Book your court in just a few simple steps and get ready to play.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 hover-lift border border-border">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
