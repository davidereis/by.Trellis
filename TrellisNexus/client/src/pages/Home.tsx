import { useEffect } from "react";
import HeroSection from "./home/HeroSection";
import ServicesSection from "./home/ServicesSection";
import PortfolioSection from "./home/PortfolioSection";
import ContactSection from "./home/ContactSection";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-vibrant to-cyan z-50 origin-left"
        style={{ scaleX }}
      />
      
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
};

export default Home;
