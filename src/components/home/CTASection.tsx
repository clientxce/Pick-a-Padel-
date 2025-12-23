import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-6">
            Ready to
            <br />
            <span className="text-gradient-lime">Play Padel?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Book your court today and experience the thrill of padel at our world-class facility.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/booking">
                Book Now
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
