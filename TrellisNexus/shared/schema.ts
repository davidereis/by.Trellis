import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (from original schema, kept for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  budget: text("budget").notNull(),
  description: text("description"),
  createdAt: text("created_at").notNull()
});

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  budget: z.string().min(1, { message: "Selecione uma faixa de orçamento" }),
  description: z.string().optional()
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Portfolio items
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false)
});

export const portfolioItemSchema = createInsertSchema(portfolioItems);

export type InsertPortfolioItem = z.infer<typeof portfolioItemSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;

// Service options
export const serviceOptions = pgTable("service_options", {
  id: serial("id").primaryKey(),
  value: text("value").notNull().unique(),
  label: text("label").notNull(),
  items: jsonb("items").notNull()
});

export const serviceOptionSchema = createInsertSchema(serviceOptions);

export type InsertServiceOption = z.infer<typeof serviceOptionSchema>;
export type ServiceOption = typeof serviceOptions.$inferSelect;

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  message: text("message").notNull(),
  isUser: boolean("is_user").notNull(),
  timestamp: text("timestamp").notNull()
});

export const chatMessageSchema = createInsertSchema(chatMessages);

export type InsertChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
