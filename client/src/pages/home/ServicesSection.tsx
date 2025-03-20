import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Building, Megaphone, Palette, CheckCircle } from "lucide-react";

// Define service categories and their content
const serviceCategories = [
  { id: "pontuais", name: "SERVIÇOS PONTUAIS", active: true },
  { id: "marcas", name: "MARCAS & LOJAS DIGITAIS", active: false },
  { id: "gestao", name: "GESTÃO DE REDES SOCIAIS", active: false }
];

const services = {
  pontuais: [
    {
      icon: <Image className="w-16 h-16" />,
      title: "DESIGNS PROMOCIONAIS",
      description: "Capas de música, banners e posts avulsos para suas campanhas e eventos especiais."
    },
    {
      icon: <Palette className="w-16 h-16" />,
      title: "EDIÇÃO DE IMAGEM",
      description: "Ajustes e retoques profissionais para transformar suas fotos em imagens de alto impacto."
    },
    {
      icon: <CheckCircle className="w-16 h-16" />,
      title: "FLYERS E CARTAZES",
      description: "Materiais gráficos impressos e digitais com designs atrativos e mensagens diretas."
    }
  ],
  marcas: [
    {
      icon: <Building className="w-16 h-16" />,
      title: "LOGO ESTRATÉGICA",
      description: "Criação de logos impactantes pensadas para fixação de marca e reconhecimento imediato."
    },
    {
      icon: <Palette className="w-16 h-16" />,
      title: "IDENTIDADE VISUAL",
      description: "Pacote completo com logo, paleta de cores, fontes e aplicações para sua marca."
    },
    {
      icon: <Image className="w-16 h-16" />,
      title: "DESIGN PARA REDES",
      description: "Posts e banners personalizados que mantêm a coerência visual e fortalecem sua identidade."
    }
  ],
  gestao: [
    {
      icon: <Megaphone className="w-16 h-16" />,
      title: "PLANEJAMENTO DE CONTEÚDO",
      description: "Estratégias visuais para aumentar engajamento e visibilidade nas plataformas sociais."
    },
    {
      icon: <CheckCircle className="w-16 h-16" />,
      title: "POSTS ESTRATÉGICOS",
      description: "Criação de posts com foco em engajamento e conversão para impulsionar suas vendas."
    },
    {
      icon: <Image className="w-16 h-16" />,
      title: "STORIES E BANNERS",
      description: "Design profissional para histórias, destaques e conteúdos promocionais nas redes sociais."
    }
  ]
};

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState("pontuais");

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">NOSSOS SERVIÇOS</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan to-cyan-dark mx-auto mb-6"></div>
          <p className="text-lightgray max-w-2xl mx-auto">
            Soluções digitais inovadoras que elevam sua marca a outro patamar, combinando tecnologia de ponta com criatividade desenfreada.
          </p>
        </motion.div>
        
        {/* Services Tabs Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12 gap-4"
        >
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                activeCategory === category.id 
                  ? "bg-cyan text-white border-2 border-white" 
                  : "bg-darkergray text-white hover:bg-darkergray/80 border border-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Service Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services[activeCategory as keyof typeof services].map((service, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glassmorphism rounded-2xl overflow-hidden transition-transform duration-500 hover:translate-y-[-10px] group border border-white/30"
            >
              <div className="h-48 bg-gradient-to-br from-cyan/20 to-cyan-dark/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.5 }}
                    className="text-white"
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-darkbg to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 group-hover:text-cyan transition-colors duration-300">{service.title}</h3>
                <p className="text-lightgray mb-4">{service.description}</p>
                <motion.a
                  href="#"
                  className="inline-flex items-center text-cyan hover:text-white transition-colors duration-300 bg-white/5 px-3 py-1 rounded-md border border-white/20"
                  whileHover={{ x: 5 }}
                >
                  <span>SAIBA MAIS</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-cyan/20 to-transparent blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-dark/10 to-transparent blur-3xl rounded-full"></div>
    </section>
  );
};

export default ServicesSection;
