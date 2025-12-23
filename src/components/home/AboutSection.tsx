import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-dark">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mt-4 leading-tight">
                More Than Just
                <br />
                <span className="text-gradient-lime">A Padel Club</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              At Pick A Padel, we're passionate about bringing the excitement of padel to everyone. 
              Our state-of-the-art facilities, expert coaching, and welcoming community make us the 
              perfect destination for players of all levels.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you're picking up a racket for the first time or you're a seasoned pro, 
              our courts are designed to deliver the ultimate padel experience. Join us and 
              discover why padel is the fastest-growing sport in the world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-black text-primary">5+</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2">Courts</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl md:text-5xl font-black text-primary">500+</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2">Members</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-4xl md:text-5xl font-black text-primary">10+</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2">Coaches</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
              <div className="absolute inset-8 border-2 border-primary/30 rounded-full" />
              <div className="absolute inset-16 border-2 border-primary/40 rounded-full" />
              <div className="absolute inset-24 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-black text-primary">PAP</div>
                  <div className="text-muted-foreground text-sm uppercase tracking-widest mt-2">
                    Pick A Padel
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lime"
              >
                <span className="text-primary-foreground text-xl font-bold">🎾</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center"
              >
                <span className="text-xl">🏆</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
