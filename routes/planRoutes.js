import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  generatePlan,
  getAllPlans,
  getPlanById,
  deletePlan,
} from "../controllers/planController.js";
import { downloadPlanPDF } from "../controllers/pdfController.js";

const router = express.Router();

// Generate AI Fitness Plan
router.post("/generate", authMiddleware, generatePlan);

// Get all plans
router.get("/", authMiddleware, getAllPlans);

// Get single plan
router.get("/:id", authMiddleware, getPlanById);

// Delete plan
router.delete("/:id", authMiddleware, deletePlan);

// Generate PDF
router.get("/download/:id", authMiddleware, downloadPlanPDF);

export default router;