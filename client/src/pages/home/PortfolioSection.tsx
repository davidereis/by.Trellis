import { useState } from "react";
import { motion } from "framer-motion";

// Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "CYBER TECH CORP",
    description: "Identidade visual futurista para startup de tecnologia",
    category: "DESIGN DIGITAL",
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "NEON WAVE CLUB",
    description: "Design digital e campanha de lançamento para club noturno",
    category: "DESIGN DIGITAL",
    image: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "VERTEX GAMES",
    description: "Campanha de marketing para lançamento de game AAA",
    category: "MARKETING",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "QUANTUM FINANCE",
    description: "Redesign de marca para fintech inovadora",
    category: "DESIGN DIGITAL",
    image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "ATLAS SPORTSWEAR",
    description: "Desenvolvimento de e-commerce e estratégia digital",
    category: "DESIGN DIGITAL",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "PULSE AUDIO",
    description: "Identidade para marca de áudio premium",
    category: "DESIGN DIGITAL",
    image: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const PortfolioSection = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleViewMore = () => {
    setVisibleItems(portfolioItems.length);
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-darkbg/80 after:to-darkbg/60 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">PORTFÓLIO</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan to-cyan-dark mx-auto mb-6"></div>
          <p className="text-lightgray max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos que transformaram marcas e criaram experiências digitais memoráveis.
          </p>
        </motion.div>
        
        {/* 3D Portfolio Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
          {portfolioItems.slice(0, visibleItems).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl transition-all duration-500 h-[350px]"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.1]"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === item.id ? 0.9 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-darkbg via-transparent to-transparent"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredItem === item.id ? 1 : 0,
                    y: hoveredItem === item.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 p-6 border-t border-l border-white/20 backdrop-blur-sm bg-black/10 rounded-tl-lg"
                >
                  <h3 className="text-xl font-bold font-orbitron mb-2">{item.title}</h3>
                  <p className="text-sm text-lightgray mb-3">{item.description}</p>
                  <span className={`inline-block px-3 py-1 ${
                    item.category === "DESIGN DIGITAL" ? "bg-cyan-dark/20 text-cyan-dark" :
                    "bg-cyan/20 text-cyan"
                  } text-xs rounded-full`}>
                    {item.category}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* View More Button */}
        {visibleItems < portfolioItems.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={handleViewMore}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              VER TODOS OS PROJETOS
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
