import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_OPTIONS } from "@/lib/constants";

// Interface para mensagens do chat
interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Interface para formulário de briefing
interface BriefingForm {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  servico: string;
  urgencia: string;
  detalhes: string;
}

const Atendimento = () => {
  // Estado para mensagens do chat
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { 
      text: "Olá! Sou o atendente virtual da Trellis. Como posso ajudar você hoje?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("chat");
  
  // Detecta parâmetro tab na URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam === "chat" || tabParam === "briefing") {
      setActiveTab(tabParam);
    }
  }, [location]);
  
  // Estado para formulário de briefing
  const [briefingForm, setBriefingForm] = useState<BriefingForm>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    servico: "",
    urgencia: "normal",
    detalhes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [orcamento, setOrcamento] = useState(0);

  // Scroll para o final do chat quando novas mensagens são adicionadas
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Função para enviar mensagem do usuário
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulação de digitação do atendente
    setIsTyping(true);
    
    // Simular resposta do atendente
    setTimeout(() => {
      setIsTyping(false);
      let response = "";
      
      // Lógica simples para respostas contextuais
      const userText = inputMessage.toLowerCase();
      
      if (userText.includes("preço") || userText.includes("valor") || userText.includes("custo") || userText.includes("orçamento")) {
        response = "Os preços variam conforme o escopo do projeto. Posso te ajudar a gerar uma estimativa. Você pode me contar mais sobre o que precisa ou preencher o briefing na aba ao lado.";
      } 
      else if (userText.includes("prazo") || userText.includes("tempo") || userText.includes("entrega")) {
        response = "Nossos prazos variam de acordo com o projeto. Geralmente, projetos de design levam de 3 a 7 dias, enquanto websites podem levar de 15 a 30 dias. Qual seria o seu projeto?";
      }
      else if (userText.includes("website") || userText.includes("site") || userText.includes("web")) {
        response = "Para websites, trabalhamos com diversas soluções, desde landing pages até e-commerces completos. Temos especialidade em sites responsivos com experiência de usuário diferenciada. Você já tem alguma referência do que gostaria?";
      }
      else if (userText.includes("design") || userText.includes("logo") || userText.includes("identidade") || userText.includes("marca")) {
        response = "Nossa equipe de design é especializada em criar identidades visuais únicas e memoráveis. Trabalhamos com logo, manual de marca, papelaria e aplicações. Você está começando uma marca nova ou quer renovar uma existente?";
      }
      else if (userText.includes("olá") || userText.includes("oi") || userText.includes("bom dia") || userText.includes("boa tarde") || userText.includes("boa noite")) {
        response = "Olá! É um prazer atender você. Como posso ajudar com seu projeto hoje?";
      }
      else if (userText.includes("quem") || userText.includes("empresa") || userText.includes("trellis")) {
        response = "A Trellis é uma agência digital inovadora especializada em design, desenvolvimento web e estratégias de marketing digital. Nosso diferencial é criar experiências digitais que combinam estética futurista com alta performance.";
      }
      else if (userText.includes("obrigado") || userText.includes("obrigada") || userText.includes("valeu") || userText.includes("agradeço")) {
        response = "Por nada! Estamos aqui para ajudar. Tem mais alguma dúvida ou podemos seguir com seu projeto?";
      }
      else {
        response = "Entendi. Para poder te ajudar melhor, gostaria de saber mais detalhes sobre seu projeto. Você pode compartilhar mais informações ou, se preferir, preencher o briefing na outra aba para um orçamento mais preciso.";
      }
      
      setChatMessages(prev => [...prev, { 
        text: response, 
        isUser: false,
        timestamp: new Date()
      }]);
    }, Math.random() * 1000 + 1000); // Tempo aleatório entre 1-2 segundos
  };

  // Função para atualizar campos do briefing
  const handleBriefingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBriefingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para atualizar campos do tipo radio
  const handleRadioChange = (value: string) => {
    setBriefingForm(prev => ({
      ...prev,
      urgencia: value
    }));
  };

  // Função para atualizar o serviço selecionado
  const handleServiceChange = (value: string) => {
    setBriefingForm(prev => ({
      ...prev,
      servico: value
    }));

    // Calcula orçamento estimado baseado no serviço
    const selectedService = SERVICE_OPTIONS.find(s => s.value === value);
    if (selectedService) {
      const basePrice = selectedService.items.reduce((total, item) => total + item.price, 0);
      // Ajustes baseados na urgência
      const urgencyMultiplier = briefingForm.urgencia === "urgente" ? 1.3 : 
                                briefingForm.urgencia === "normal" ? 1 : 0.9;
      setOrcamento(Math.round(basePrice * urgencyMultiplier));
    } else {
      setOrcamento(0);
    }
  };

  // Função para enviar o formulário de briefing
  const handleSubmitBriefing = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulação de envio
    setTimeout(() => {
      toast({
        title: "Briefing enviado com sucesso!",
        description: "Entraremos em contato em breve com seu orçamento detalhado.",
      });
      setSubmitting(false);
      
      // Adiciona mensagem no chat sobre o briefing
      setChatMessages(prev => [...prev, { 
        text: `Obrigado, ${briefingForm.nome}! Seu briefing foi enviado com sucesso. Entraremos em contato através do email ${briefingForm.email} em breve com um orçamento detalhado.`, 
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-cyan/10">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para Home</span>
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-cyan to-sky-400 bg-clip-text text-transparent">
            Atendimento Personalizado
          </h1>
        </motion.div>
        <div className="w-48 h-1 bg-gradient-to-r from-cyan to-sky-400 mt-4 mb-6"></div>
        <p className="text-lightgray max-w-3xl">
          Converse diretamente com nossa equipe ou preencha um briefing detalhado para receber um orçamento personalizado para o seu projeto.
        </p>
      </div>
      
      {/* Conteúdo Principal - Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="chat" className="data-[state=active]:bg-cyan data-[state=active]:text-white">Chat com Atendente</TabsTrigger>
            <TabsTrigger value="briefing" className="data-[state=active]:bg-cyan data-[state=active]:text-white">Briefing para Orçamento</TabsTrigger>
          </TabsList>
          
          {/* Tab de Chat */}
          <TabsContent value="chat">
            <Card className="border border-white/10 bg-darkbg/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Área de Chat */}
                  <div className="flex-1">
                    <div className="bg-background border border-white/10 rounded-lg p-4 h-[400px] overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.isUser 
                                ? 'bg-cyan/20 text-white' 
                                : 'bg-white/5 text-white'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start mb-4">
                          <div className="bg-white/5 text-white p-3 rounded-lg">
                            <div className="flex gap-1">
                              <span className="animate-bounce">.</span>
                              <span className="animate-bounce delay-100">.</span>
                              <span className="animate-bounce delay-200">.</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                    
                    {/* Formulário de Input */}
                    <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 bg-card text-white border-white/10 focus:border-cyan"
                      />
                      <Button type="submit" className="bg-cyan hover:bg-cyan/80">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  
                  {/* Informações de Contato */}
                  <div className="w-full md:w-72 space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3 font-orbitron">Contato Direto</h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-white/10 hover:bg-white/5 hover:text-cyan"
                          onClick={() => window.open('tel:+5511999999999', '_blank')}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          <span>Agendar Ligação</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-white/10 hover:bg-white/5 hover:text-cyan"
                          onClick={() => window.open('https://calendly.com/trellis/30min', '_blank')}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Agendar Reunião</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-white/10 hover:bg-green-500/20 hover:text-green-500 hover:border-green-500/30"
                          onClick={() => window.open('https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20meu%20projeto.', '_blank')}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 mr-2" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <span>Iniciar no WhatsApp</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3 font-orbitron">Horário de Atendimento</h3>
                      <p className="text-sm text-gray-300">Segunda a Sexta</p>
                      <p className="text-sm">9:00 às 18:00</p>
                      <div className="h-0.5 bg-white/10 my-3"></div>
                      <p className="text-sm text-gray-300">Sábado</p>
                      <p className="text-sm">9:00 às 13:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab de Briefing */}
          <TabsContent value="briefing">
            <Card className="border border-white/10 bg-darkbg/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmitBriefing} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informações do Cliente */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-orbitron mb-4">Informações do Cliente</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={briefingForm.nome}
                          onChange={handleBriefingChange}
                          placeholder="Seu nome completo"
                          required
                          className="bg-card text-white border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={briefingForm.email}
                          onChange={handleBriefingChange}
                          placeholder="seu@email.com"
                          required
                          className="bg-card text-white border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          value={briefingForm.telefone}
                          onChange={handleBriefingChange}
                          placeholder="(00) 00000-0000"
                          className="bg-card text-white border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="empresa">Empresa</Label>
                        <Input
                          id="empresa"
                          name="empresa"
                          value={briefingForm.empresa}
                          onChange={handleBriefingChange}
                          placeholder="Nome da sua empresa"
                          className="bg-card text-white border-white/10"
                        />
                      </div>
                    </div>
                    
                    {/* Detalhes do Projeto */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-orbitron mb-4">Detalhes do Projeto</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="servico">Serviço Desejado</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {SERVICE_OPTIONS.map((option) => (
                            <div 
                              key={option.value}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                briefingForm.servico === option.value
                                  ? 'border-cyan bg-cyan/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                              onClick={() => handleServiceChange(option.value)}
                            >
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-400 mt-1">
                                {option.items.map(item => item.name).join(', ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Urgência do Projeto</Label>
                        <RadioGroup 
                          value={briefingForm.urgencia} 
                          onValueChange={handleRadioChange}
                          className="flex"
                        >
                          <div className="flex items-center space-x-2 mr-4">
                            <RadioGroupItem value="baixa" id="baixa" />
                            <Label htmlFor="baixa">Baixa</Label>
                          </div>
                          <div className="flex items-center space-x-2 mr-4">
                            <RadioGroupItem value="normal" id="normal" />
                            <Label htmlFor="normal">Normal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="urgente" id="urgente" />
                            <Label htmlFor="urgente">Urgente</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="detalhes">Detalhes Adicionais</Label>
                        <Textarea
                          id="detalhes"
                          name="detalhes"
                          value={briefingForm.detalhes}
                          onChange={handleBriefingChange}
                          placeholder="Descreva seu projeto, objetivos, prazos e quaisquer detalhes importantes..."
                          className="min-h-[120px] bg-card text-white border-white/10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Orçamento estimado e botão de envio */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 border-t border-white/10">
                    {orcamento > 0 && (
                      <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-400">Orçamento estimado:</p>
                        <p className="text-2xl font-orbitron text-cyan">
                          {orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-xs text-gray-500">
                          *Este é apenas um valor estimado. O orçamento final pode variar conforme detalhes específicos do projeto.
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-3 w-full md:w-auto">
                      <Button 
                        type="submit" 
                        className="bg-cyan hover:bg-cyan/80 flex-1"
                        disabled={submitting}
                      >
                        {submitting ? "Enviando..." : "Enviar Briefing"}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline"
                        className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                        onClick={() => window.open('https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20meu%20projeto.', '_blank')}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Elementos decorativos */}
      <div className="fixed top-1/4 right-0 w-1/3 h-1/3 bg-gradient-radial from-cyan/10 to-transparent blur-3xl rounded-full -z-10"></div>
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-dark/10 to-transparent blur-3xl rounded-full -z-10"></div>
    </div>
  );
};

export default Atendimento;