// Color constants for the site
export const COLORS = {
  primary: "#00AFFF",   // Azul-ciano
  secondary: "#0077CC", // Azul escuro complementar
  tertiary: "#00E5FF",  // Ciano vibrante
  darkBg: "#0D0D0D",    // Preto Profundo
  white: "#FFFFFF",     // Branco - para contraste e legibilidade
  darkerGray: "#151515",
  lightGray: "#AAAAAA",
  border: "#333333",
  glass: "rgba(13, 13, 13, 0.85)",
  gradient: "linear-gradient(135deg, #00AFFF, #0077CC)",
  gradientVibrant: "linear-gradient(135deg, #00E5FF, #00AFFF)"
};

// Navigation items
export const NAV_ITEMS = [
  {
    label: "INÍCIO",
    href: "#hero"
  },
  {
    label: "SERVIÇOS",
    href: "#services"
  },
  {
    label: "PORTFOLIO",
    href: "#portfolio"
  },
  {
    label: "CONTATO",
    href: "#contact"
  }
];

// Service categories
export const SERVICE_CATEGORIES = [
  {
    id: "pontuais",
    name: "SERVIÇOS PONTUAIS",
    icon: "image",
    description: "Para quem precisa de algo rápido e eficiente, sem compromisso mensal."
  },
  {
    id: "marcas",
    name: "MARCAS & LOJAS DIGITAIS",
    icon: "building",
    description: "Para quem quer construir uma identidade forte e uma presença digital marcante."
  },
  {
    id: "gestao",
    name: "GESTÃO DE REDES SOCIAIS",
    icon: "megaphone",
    description: "Para quem quer uma presença digital ativa e um feed profissional sem dor de cabeça."
  }
];

// Portfolio categories
export const PORTFOLIO_CATEGORIES = [
  {
    id: "all",
    name: "TODOS"
  },
  {
    id: "digital",
    name: "DESIGN GRÁFICO"
  },
  {
    id: "marketing",
    name: "MARKETING DIGITAL"
  },
  {
    id: "web",
    name: "WEB DESIGN"
  }
];

// Social media links
export const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    url: "https://instagram.com",
    icon: "instagram"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin"
  },
  {
    platform: "Dribbble",
    url: "https://dribbble.com",
    icon: "dribbble"
  },
  {
    platform: "Behance",
    url: "https://behance.net",
    icon: "behance"
  }
];

// Budget ranges
export const BUDGET_RANGES = {
  small: { label: "Até €1.000", min: 500, max: 1000 },
  medium: { label: "€1.000 - €3.000", min: 1000, max: 3000 },
  large: { label: "€3.000 - €10.000", min: 3000, max: 10000 },
  enterprise: { label: "Acima de €10.000", min: 10000, max: 50000 }
};

// Service options for contact form
export const SERVICE_OPTIONS = [
  { 
    value: "pontuais", 
    label: "SERVIÇOS PONTUAIS", 
    items: [
      { name: "Designs promocionais (capas, banners, posts)", price: 300 },
      { name: "Edição de imagem (ajustes e retoques)", price: 200 },
      { name: "Criação de flyers e cartazes", price: 350 },
      { name: "Pacote personalizado", price: 500 }
    ]
  },
  { 
    value: "marcas", 
    label: "MARCAS & LOJAS DIGITAIS", 
    items: [
      { name: "Criação de logo estratégica", price: 800 },
      { name: "Identidade visual completa", price: 1500 },
      { name: "Design para redes sociais", price: 700 },
      { name: "Gestão inicial de redes sociais", price: 950 }
    ]
  },
  { 
    value: "gestao", 
    label: "GESTÃO DE REDES SOCIAIS", 
    items: [
      { name: "Criação e planejamento de conteúdo visual", price: 800 },
      { name: "Posts estratégicos para engajamento", price: 600 },
      { name: "Design de stories e banners promocionais", price: 450 },
      { name: "Análise e otimização do perfil", price: 500 }
    ]
  }
];
