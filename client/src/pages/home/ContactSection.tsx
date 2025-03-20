import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  budget: z.string().min(1, { message: "Selecione uma faixa de orçamento" }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Budget mapping
const budgetRanges = {
  small: { label: "Até R$ 5.000", min: 3000, max: 5000 },
  medium: { label: "R$ 5.000 - R$ 15.000", min: 5000, max: 15000 },
  large: { label: "R$ 15.000 - R$ 50.000", min: 15000, max: 50000 },
  enterprise: { label: "Acima de R$ 50.000", min: 50000, max: 200000 }
};

// Service mapping with predefined costs
const serviceOptions = [
  { value: "branding", label: "Branding", items: [
    { name: "Identidade Visual", price: 3500 },
    { name: "Manual de Marca", price: 2800 },
    { name: "Aplicações", price: 1200 }
  ]},
  { value: "web-design", label: "Web Design", items: [
    { name: "Design de Interface", price: 4500 },
    { name: "Desenvolvimento", price: 6000 },
    { name: "Responsividade", price: 1500 }
  ]},
  { value: "digital-marketing", label: "Marketing Digital", items: [
    { name: "Estratégia", price: 2500 },
    { name: "Execução", price: 5000 },
    { name: "Análise e Relatórios", price: 1800 }
  ]},
  { value: "social-media", label: "Social Media", items: [
    { name: "Criação de Conteúdo", price: 2200 },
    { name: "Gestão de Redes", price: 1800 },
    { name: "Publicidade", price: 3500 }
  ]}
];

// Chat message type
interface Message {
  text: string;
  isUser: boolean;
}

const ContactSection = () => {
  const [selectedService, setSelectedService] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { text: "Olá! Sou a TrellisAI. Como posso ajudar com seu projeto?", isUser: false }
  ]);
  const [chatInput, setChatInput] = useState("");
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      budget: "",
      description: ""
    }
  });

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    form.setValue("service", value);
  };

  const onSubmit = (values: FormValues) => {
    toast({
      title: "Formulário enviado!",
      description: "Redirecionando para atendimento personalizado...",
    });
    console.log(values);
    
    // Redirecionar para a página de atendimento com os dados preenchidos
    setTimeout(() => {
      navigate('/atendimento?tab=briefing');
    }, 1500);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      let response;
      if (chatInput.toLowerCase().includes("identidade") || chatInput.toLowerCase().includes("visual") || chatInput.toLowerCase().includes("logo")) {
        response = "Para identidade visual, recomendamos nosso pacote completo de branding que inclui logo, guia de marca e aplicações.";
      } else if (chatInput.toLowerCase().includes("website") || chatInput.toLowerCase().includes("site")) {
        response = "Para websites, oferecemos desde landing pages até portais complexos, com design responsivo e otimizados para SEO.";
      } else if (chatInput.toLowerCase().includes("preço") || chatInput.toLowerCase().includes("valor") || chatInput.toLowerCase().includes("custo")) {
        response = "Os valores variam conforme a complexidade do projeto. Preencha o formulário ao lado para uma estimativa personalizada.";
      } else {
        response = "Interessante! Podemos conversar mais sobre seu projeto específico. Que tal agendar uma reunião?";
      }
      setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  // Calculate estimated budget based on selected service
  const calculateBudget = () => {
    const service = serviceOptions.find(s => s.value === selectedService);
    if (!service) return 0;
    
    return service.items.reduce((total, item) => total + item.price, 0);
  };

  const estimatedBudget = calculateBudget();

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">ENTRE EM CONTATO</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan to-cyan-dark mx-auto mb-6"></div>
          <p className="text-lightgray max-w-2xl mx-auto">
            Pronto para transformar sua marca? Preencha o formulário abaixo e receba um orçamento instantâneo para o seu projeto.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Dynamic Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glassmorphism rounded-2xl p-8"
          >
            <h3 className="text-2xl font-orbitron font-bold mb-6">BRIEFING</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-lightgray">Nome / Empresa</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome ou empresa" 
                          {...field} 
                          className="w-full bg-darkergray border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-lightgray">E-mail</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seu@email.com" 
                          type="email"
                          {...field} 
                          className="w-full bg-darkergray border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-lightgray">Tipo de Serviço</FormLabel>
                      <Select 
                        onValueChange={(value) => handleServiceChange(value)} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-darkergray border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan">
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-darkergray border border-white/10">
                          {serviceOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-lightgray">Orçamento Aproximado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-darkergray border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan">
                            <SelectValue placeholder="Selecione uma faixa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-darkergray border border-white/10">
                          {Object.entries(budgetRanges).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-lightgray">Descrição do Projeto</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte-nos sobre seu projeto..." 
                          {...field} 
                          rows={4}
                          className="w-full bg-darkergray border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan to-cyan-dark text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center">
                    SOLICITAR ORÇAMENTO
                    <Send className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </span>
                </Button>
              </form>
            </Form>
          </motion.div>
          
          {/* Live Budget Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glassmorphism rounded-2xl p-8 relative overflow-hidden"
          >
            <h3 className="text-2xl font-orbitron font-bold mb-6">ESTIMATIVA DE ORÇAMENTO</h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-darkergray/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-lightgray">Serviço Selecionado:</span>
                  <span className="font-medium">
                    {selectedService 
                      ? serviceOptions.find(s => s.value === selectedService)?.label 
                      : "Selecione um serviço"}
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full mb-6"></div>
                
                {selectedService && (
                  <div>
                    <div className="mb-4">
                      {serviceOptions.find(s => s.value === selectedService)?.items.map((item, index) => (
                        <div key={index} className="flex justify-between mb-1">
                          <span className="text-sm text-lightgray">{item.name}</span>
                          <span className="text-sm font-medium">€ {item.price.toLocaleString('pt-BR')}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg text-lightgray">Valor Estimado:</span>
                        <span className="text-lg font-bold text-cyan">€ {estimatedBudget.toLocaleString('pt-BR')}</span>
                      </div>
                      <p className="text-xs text-lightgray mt-2">* Este valor é uma estimativa inicial e pode variar conforme requisitos específicos do projeto.</p>
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <Button 
                          type="button" 
                          onClick={() => navigate('/atendimento?tab=chat')}
                          className="px-3 py-2 bg-gradient-to-r from-cyan-vibrant to-cyan text-white font-medium rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-300 text-sm"
                        >
                          <span className="flex items-center justify-center">
                            Chat com Atendente
                            <ArrowRight className="ml-1" size={14} />
                          </span>
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => navigate('/atendimento?tab=briefing')}
                          className="px-3 py-2 bg-gradient-to-r from-cyan to-cyan-dark text-white font-medium rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-300 text-sm"
                        >
                          <span className="flex items-center justify-center">
                            Briefing Completo
                            <ArrowRight className="ml-1" size={14} />
                          </span>
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => window.open('https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20meu%20projeto.', '_blank')}
                          className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-300 text-sm"
                        >
                          <span className="flex items-center justify-center">
                            Iniciar no WhatsApp
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="ml-1 h-4 w-4" 
                              viewBox="0 0 24 24" 
                              fill="currentColor"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            </svg>
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat Widget Preview */}
              <div className="p-4 bg-darkergray/50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Fale com nossa IA</h4>
                  <Button 
                    type="button"
                    onClick={() => navigate('/atendimento?tab=chat')}
                    className="text-xs text-cyan hover:underline flex items-center"
                    variant="link"
                  >
                    Atendimento humano
                    <ArrowRight className="ml-1" size={12} />
                  </Button>
                </div>
                <div className="bg-darkbg rounded-lg p-3 h-40 overflow-y-auto mb-4 flex flex-col gap-3">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`${message.isUser ? "text-right" : ""}`}>
                      <div className={`${
                        message.isUser 
                          ? "bg-cyan/20 text-white" 
                          : "bg-darkergray text-lightgray"
                        } p-2 rounded-lg inline-block max-w-[80%]`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="w-full bg-darkergray border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-cyan text-white"
                  />
                  <Button type="submit" className="p-2 bg-cyan text-white rounded-lg">
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-radial from-cyan/30 to-transparent blur-xl rounded-full"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gradient-radial from-cyan-dark/10 to-transparent blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan/10 to-transparent blur-3xl rounded-full"></div>
    </section>
  );
};

export default ContactSection;
