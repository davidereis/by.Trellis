import { 
  users, type User, type InsertUser,
  type ContactFormData, type ContactSubmission,
  type PortfolioItem, type ServiceOption
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form submissions
  createContactSubmission(data: ContactFormData): Promise<ContactSubmission>;
  
  // Portfolio items
  getPortfolioItems(): Promise<PortfolioItem[]>;
  
  // Service options
  getServiceOptions(): Promise<ServiceOption[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private portfolioItems: Map<number, PortfolioItem>;
  private serviceOptions: Map<number, ServiceOption>;
  
  currentId: number;
  contactId: number;
  portfolioId: number;
  serviceId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.portfolioItems = new Map();
    this.serviceOptions = new Map();
    
    this.currentId = 1;
    this.contactId = 1;
    this.portfolioId = 1;
    this.serviceId = 1;
    
    // Initialize with sample data
    this.initializeServiceOptions();
    this.initializePortfolioItems();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactSubmission(data: ContactFormData): Promise<ContactSubmission> {
    const id = this.contactId++;
    const submission: ContactSubmission = {
      id,
      name: data.name,
      email: data.email,
      service: data.service,
      budget: data.budget,
      description: data.description || null,
      createdAt: new Date().toISOString()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }
  
  async getServiceOptions(): Promise<ServiceOption[]> {
    return Array.from(this.serviceOptions.values());
  }
  
  // Helper method to initialize service options with sample data
  private initializeServiceOptions() {
    const services = [
      {
        id: this.serviceId++,
        value: "branding",
        label: "Identidade Visual & Branding",
        items: [
          "Criação de logotipos profissionais",
          "Desenvolvimento de manuais de marca",
          "Definição de paleta de cores e tipografia",
          "Design de identidade visual completa"
        ]
      },
      {
        id: this.serviceId++,
        value: "design",
        label: "Design Gráfico & Mídia Digital",
        items: [
          "Criação de posts para redes sociais",
          "Design de banners, capas e thumbnails",
          "Layouts para e-books e apresentações",
          "UI/UX para websites e aplicativos"
        ]
      },
      {
        id: this.serviceId++,
        value: "marketing",
        label: "Marketing & Gestão Digital",
        items: [
          "Planejamento estratégico para redes sociais",
          "Gestão e criação de conteúdo",
          "Desenvolvimento de campanhas publicitárias",
          "Estratégias de engajamento e crescimento orgânico"
        ]
      },
      {
        id: this.serviceId++,
        value: "web",
        label: "Web Design & Desenvolvimento",
        items: [
          "Criação de sites institucionais e landing pages",
          "Design responsivo e otimizado para SEO",
          "Integração com sistemas e formulários",
          "Desenvolvimento de portfólios digitais"
        ]
      }
    ];
    
    services.forEach(service => {
      this.serviceOptions.set(service.id, service);
    });
  }
  
  // Helper method to initialize portfolio items with sample data
  private initializePortfolioItems() {
    const items = [
      {
        id: this.portfolioId++,
        title: "TechVerse Portal",
        description: "Portal corporativo com interface futurista e experiência imersiva em 3D",
        category: "web",
        imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
        featured: true
      },
      {
        id: this.portfolioId++,
        title: "NeoStore E-commerce",
        description: "Experiência de compra com visualização de produtos em realidade aumentada",
        category: "web",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        featured: true
      },
      {
        id: this.portfolioId++,
        title: "Interface Cyberpunk",
        description: "Dashboard com design inspirado em estética cyberpunk para startup de tecnologia",
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        featured: false
      },
      {
        id: this.portfolioId++,
        title: "Neon Dreams",
        description: "Identidade visual completa para empresa de entretenimento digital",
        category: "branding",
        imageUrl: "https://images.unsplash.com/photo-1600494603989-9650cf6dad51",
        featured: true
      },
      {
        id: this.portfolioId++,
        title: "Campanha Viral AR",
        description: "Campanha de mídia social interativa com filtros de realidade aumentada",
        category: "marketing",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
        featured: true
      },
      {
        id: this.portfolioId++,
        title: "Logotipo Eclipse",
        description: "Redesign de marca para empresa de tecnologia com paleta futurista",
        category: "branding",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
        featured: false
      },
      {
        id: this.portfolioId++,
        title: "Mídia Kit Quantum",
        description: "Kit de mídia social com animações e elementos interativos",
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
        featured: true
      },
      {
        id: this.portfolioId++,
        title: "Growth Strategy",
        description: "Estratégia completa de crescimento digital para lançamento de produto inovador",
        category: "marketing",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        featured: false
      }
    ];
    
    items.forEach(item => {
      this.portfolioItems.set(item.id, item);
    });
  }
}

export const storage = new MemStorage();
