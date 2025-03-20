import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Dribbble, Globe } from "lucide-react";
import { SiBehance } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="glassmorphism py-12 border-t border-white/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-1"
          >
            <div className="text-3xl font-bold font-orbitron text-gradient mb-4">TRELLIS</div>
            <p className="text-lightgray mb-6">
              Transformando marcas em experiências inesquecíveis. O design que te faz crescer!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="bg-darkgray bg-opacity-30 p-1 rounded-md" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="bg-darkgray bg-opacity-30 p-1 rounded-md" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="bg-darkgray bg-opacity-30 p-1 rounded-md" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan transition-colors duration-300"
                aria-label="Dribbble"
              >
                <Dribbble className="bg-darkgray bg-opacity-30 p-1 rounded-md" />
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan transition-colors duration-300"
                aria-label="Behance"
              >
                <SiBehance className="bg-darkgray bg-opacity-30 p-1.5 rounded-md h-6 w-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#services" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#contact" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Branding
                </a>
              </li>
              <li>
                <a href="#services" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Marketing Digital
                </a>
              </li>
              <li>
                <a href="#services" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Design de UI/UX
                </a>
              </li>
              <li>
                <a href="#services" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Desenvolvimento Web
                </a>
              </li>
              <li>
                <a href="#services" className="text-lightgray hover:text-cyan transition-colors duration-300">
                  Growth Hacking
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-lightgray mb-4">
              Receba nossas novidades, insights e tendências de design.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full bg-darkergray border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan to-magenta text-white font-medium rounded-lg hover:shadow-lg hover:shadow-magenta/30 transition-all duration-300"
              >
                INSCREVER-SE
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-lightgray">
          <p>&copy; {new Date().getFullYear()} Trellis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
