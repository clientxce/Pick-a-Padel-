import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Eye, Heart, Users, Trophy, Zap } from "lucide-react";
import logo from "@/assets/logo.png";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We live and breathe padel. Our passion drives everything we do.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections through sport. Everyone is welcome here.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Striving for the highest standards in facilities and service.",
  },
  {
    icon: Zap,
    title: "Energy",
    description: "Creating an atmosphere that inspires and motivates players.",
  },
];

const About = () => {
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 md:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mt-4">
              Our <span className="text-gradient-lime">Story</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
              <div className="flex justify-center mb-8">
                <img src={logo} alt="Pick A Padel" className="h-24 w-auto" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Pick A Padel was born from a simple idea: to bring the joy of padel to everyone. 
                What started as a dream has grown into a thriving community of players who share 
                our passion for this incredible sport.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our founders, avid padel enthusiasts themselves, recognized the need for 
                world-class facilities that could cater to players of all levels. They set out 
                to create a space where beginners could learn, intermediate players could grow, 
                and advanced players could compete.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, Pick A Padel stands as a testament to that vision. With state-of-the-art 
                courts, expert coaching, and a welcoming community, we're proud to be at the 
                forefront of the padel revolution.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section ref={missionRef} className="section-padding bg-card">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="bg-background rounded-2xl p-8 border border-border"
              >
                <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold uppercase mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To make padel accessible to everyone by providing exceptional facilities, 
                  expert coaching, and a welcoming environment that fosters growth and community. 
                  We believe that everyone deserves the opportunity to experience the joy of padel.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-background rounded-2xl p-8 border border-border"
              >
                <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold uppercase mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading padel destination, known for our commitment to excellence, 
                  innovation, and community building. We envision a future where padel is loved 
                  and played by millions, and we're committed to making that vision a reality.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="section-padding bg-background">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mt-4">
                Our <span className="text-gradient-lime">Values</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border text-center hover-lift"
                >
                  <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-gradient-dark">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "5+", label: "Premium Courts" },
                { value: "500+", label: "Happy Players" },
                { value: "10+", label: "Expert Coaches" },
                { value: "100+", label: "Events Hosted" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
