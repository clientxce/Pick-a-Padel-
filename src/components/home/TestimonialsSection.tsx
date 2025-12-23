import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Player",
    content:
      "Pick A Padel has become my second home! The facilities are top-notch and the community is incredibly welcoming. I've improved so much since I started playing here.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tournament Player",
    content:
      "The quality of the courts is exceptional. Perfect for serious players who want to take their game to the next level. The coaching staff is world-class.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Beginner",
    content:
      "I was nervous starting a new sport, but the team made me feel right at home. The beginner classes are fantastic and the booking system is so easy to use!",
    rating: 5,
  },
  {
    name: "David Martinez",
    role: "Weekend Player",
    content:
      "Great location, amazing facilities, and a vibrant community. The best padel experience in the city, hands down!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-dark overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mt-4">
            What Players <span className="text-gradient-lime">Say</span>
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 md:p-12 border border-border relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-primary/20">
              <Quote size={64} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-primary text-primary" />
              ))}
            </div>

            {/* Content */}
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl text-foreground leading-relaxed mb-8"
            >
              "{testimonials[currentIndex].content}"
            </motion.p>

            {/* Author */}
            <motion.div
              key={`author-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
              <div className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted hover:border-primary transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted hover:border-primary transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
