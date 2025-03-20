import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const steps = [
  { id: 'info', title: 'Informações Básicas' },
  { id: 'briefing', title: 'Briefing do Projeto' },
  { id: 'requirements', title: 'Requisitos' },
  { id: 'budget', title: 'Orçamento' },
  { id: 'summary', title: 'Resumo' },
];

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    description: '',
    timeline: '',
    budget: '',
    requirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      // Enviar dados finais
      console.log('Enviando dados:', formData);
      // Em um caso real, você enviaria isso para o backend
    } else {
      nextStep();
    }
  };

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <section className="min-h-screen pt-24 pb-16 bg-darkbg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan/10 to-transparent blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-dark/10 to-transparent blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center justify-between"
        >
          <Link href="/">
            <a className="flex items-center text-white hover:text-cyan transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Voltar para Home</span>
            </a>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-gradient">
            Iniciar Projeto
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center hidden md:block">
                <div className={`text-sm ${
                  index <= currentStep ? 'text-cyan' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <div className="md:hidden mt-2">
            <p className="text-white font-medium">
              {steps[currentStep].title}
              <span className="text-gray-400"> ({currentStep + 1}/{steps.length})</span>
            </p>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glassmorphism rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Informações Básicas */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Informações Básicas</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Nome Completo</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                      className="w-full bg-darkergray/50 border-white/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className="w-full bg-darkergray/50 border-white/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-white mb-2">Empresa (opcional)</label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa"
                      className="w-full bg-darkergray/50 border-white/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Briefing do Projeto */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Briefing do Projeto</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="projectType" className="block text-white mb-2">Tipo de Projeto</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md bg-darkergray/50 border border-white/10 text-white"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="website">Website</option>
                      <option value="web-app">Aplicação Web</option>
                      <option value="mobile-app">Aplicativo Móvel</option>
                      <option value="e-commerce">E-commerce</option>
                      <option value="design-digital">Design Digital</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-white mb-2">Descrição do Projeto</label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Descreva seu projeto em detalhes"
                      required
                      className="w-full min-h-[150px] bg-darkergray/50 border-white/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Requisitos */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Requisitos do Projeto</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="requirements" className="block text-white mb-2">Requisitos Específicos</label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Liste os requisitos específicos do seu projeto"
                      className="w-full min-h-[150px] bg-darkergray/50 border-white/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-white mb-2">Prazo Desejado</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-darkergray/50 border border-white/10 text-white"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="1month">1 mês</option>
                      <option value="2months">2 meses</option>
                      <option value="3months">3 meses</option>
                      <option value="6months">6 meses</option>
                      <option value="flexible">Flexível</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Orçamento */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Orçamento</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="budget" className="block text-white mb-2">Faixa de Orçamento</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-darkergray/50 border border-white/10 text-white"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="low">€ 1.000 - € 5.000</option>
                      <option value="medium">€ 5.000 - € 10.000</option>
                      <option value="high">€ 10.000 - € 20.000</option>
                      <option value="enterprise">€ 20.000+</option>
                      <option value="unsure">Não tenho certeza</option>
                    </select>
                  </div>
                  <div className="p-4 bg-cyan/10 rounded-lg mt-6">
                    <h3 className="text-cyan font-medium mb-2">Importante</h3>
                    <p className="text-white text-sm">
                      Este orçamento é apenas uma estimativa inicial. Nossa equipe elaborará uma proposta detalhada com base nos requisitos específicos do seu projeto.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Resumo */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Resumo do Projeto</h2>
                <div className="space-y-4 bg-darkergray/30 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-cyan text-sm">Nome</h3>
                      <p className="text-white">{formData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan text-sm">Email</h3>
                      <p className="text-white">{formData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan text-sm">Empresa</h3>
                      <p className="text-white">{formData.company || '-'}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan text-sm">Tipo de Projeto</h3>
                      <p className="text-white">{formData.projectType}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan text-sm">Prazo</h3>
                      <p className="text-white">{formData.timeline || '-'}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan text-sm">Orçamento</h3>
                      <p className="text-white">{formData.budget}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-cyan text-sm">Descrição</h3>
                    <p className="text-white text-sm">{formData.description}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-cyan text-sm">Requisitos</h3>
                    <p className="text-white text-sm">{formData.requirements || '-'}</p>
                  </div>
                </div>
                <div className="p-4 bg-cyan/10 rounded-lg mt-4">
                  <div className="flex items-start">
                    <Check className="text-cyan mr-2 mt-1 h-5 w-5" />
                    <p className="text-white text-sm">
                      Ao enviar este formulário, nossa equipe entrará em contato dentro de 24 horas úteis para discutir os próximos passos do seu projeto.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 hover:border-cyan/50"
                >
                  Voltar
                </Button>
              ) : (
                <div></div>
              )}
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyan to-cyan-dark text-white"
              >
                {currentStep === steps.length - 1 ? (
                  <span className="flex items-center">
                    Enviar <Send className="ml-2 h-4 w-4" />
                  </span>
                ) : (
                  'Próximo'
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default GetStarted;