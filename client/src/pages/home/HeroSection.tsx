import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParallax } from "@/lib/hooks/use-parallax";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { applyParallaxEffect } = useParallax();

  useEffect(() => {
    if (!heroRef.current) return;
    
    const cleanup = applyParallaxEffect(heroRef.current);
    return cleanup;
  }, [applyParallaxEffect]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center" ref={heroRef}>
      {/* Video Background container */}
      <div className="absolute inset-0 z-0">
        {/* In a real implementation, this would be a video */}
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-darkbg/80 to-darkbg/60"></div>
        
        {/* Dynamic grid overlay */}
        <div 
          className="absolute inset-0 bg-center opacity-30"
          style={{ 
            backgroundImage: `url('https://assets.codepen.io/721952/grid.svg')`
          }}
        ></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan font-orbitron tracking-widest mb-4"
          >
            BEM-VINDO AO FUTURO
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold font-orbitron mb-6"
          >
            <span className="block border-b-4 border-white pb-2 inline-block">SOMOS A <span className="text-white font-extrabold">TRELLIS</span>.</span>
            <span className="text-gradient mt-3 block">O RESTO É HISTÓRIA.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-lightgray mb-8 max-w-2xl mx-auto"
          >
            Criamos experiências digitais revolucionárias que transcendem o ordinário e definem o extraordinário.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-cyan text-white font-medium rounded-full hover:bg-cyan/90 transition-all duration-300 flex items-center justify-center group neon-glow animate-glow border-2 border-white"
            >
              <span>EXPLORE NOSSO UNIVERSO</span>
              <motion.i 
                className="fas fa-arrow-right ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              ></motion.i>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <span>CONHEÇA NOSSO TRABALHO</span>
            </motion.button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce"
          >
            <span className="text-sm text-white/70 mb-2">ROLAR</span>
            <ChevronDown className="text-cyan" />
          </motion.div>
        </div>
      </div>
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-[10%] w-32 h-32 bg-cyan/20 rounded-full blur-2xl"
        />
        
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 left-[15%] w-40 h-40 bg-cyan-dark/20 rounded-full blur-xl"
        />

        {/* Elementos em branco */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/3 right-[25%] w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-[20%] w-36 h-36 bg-white/5 rounded-full blur-2xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;
