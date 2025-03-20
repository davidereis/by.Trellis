import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-darkgray bg-noise">
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
          className="absolute bottom-1/3 left-[15%] w-40 h-40 bg-cyan/20 rounded-full blur-xl"
        />
      </div>
      
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        animate="show"
        className="w-full max-w-md mx-4 z-10"
      >
        <Card className="glassmorphism border-white/10 shadow-lg shadow-cyan/5">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center text-center mb-8">
              <AlertCircle className="h-16 w-16 text-cyan mb-4" />
              <h1 className="text-3xl font-bold text-white font-orbitron">404</h1>
              <h2 className="text-xl text-white/90 mt-2">Página Não Encontrada</h2>
            </div>

            <p className="mt-4 text-lightgray text-center mb-8">
              A página que você está procurando não existe ou foi movida.
            </p>
            
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-cyan to-blue-600 hover:opacity-90 transition-all">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
