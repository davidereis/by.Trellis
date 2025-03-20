import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const contactData = contactFormSchema.parse(req.body);
      
      // Store contact form submission
      const submission = await storage.createContactSubmission(contactData);
      
      res.status(201).json({
        message: "Contato recebido com sucesso!",
        data: submission
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors
        });
        return;
      }
      
      res.status(500).json({
        message: "Erro ao processar formulário de contato",
        error: (error as Error).message
      });
    }
  });

  // Get service options
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getServiceOptions();
      res.json(services);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar serviços",
        error: (error as Error).message
      });
    }
  });

  // Get portfolio items
  app.get("/api/portfolio", async (_req, res) => {
    try {
      const portfolioItems = await storage.getPortfolioItems();
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar portfólio",
        error: (error as Error).message
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
