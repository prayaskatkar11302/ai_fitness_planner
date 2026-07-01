import PDFDocument from "pdfkit";
import FitnessPlan from "../models/FitnessPlan.js";

export const downloadPlanPDF = async (req, res) => {
  try {
    const plan = await FitnessPlan.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=fitness-plan.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text("AI Fitness Planner", {
        align: "center"
      });

    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Name: ${plan.fitnessDetails.name}`);

    doc.text(
      `Goal: ${plan.fitnessDetails.fitnessGoal}`
    );

    doc.text(
      `Age: ${plan.fitnessDetails.age}`
    );

    doc.moveDown();

    doc
      .fontSize(16)
      .text("Workout Plan");

    plan.workoutPlan.forEach((item) => {
      doc.text(`- ${item}`);
    });

    doc.moveDown();

    doc
      .fontSize(16)
      .text("Diet Suggestions");

    plan.dietSuggestions.forEach((item) => {
      doc.text(`- ${item}`);
    });

    doc.moveDown();

    doc
      .fontSize(16)
      .text("Fitness Tips");

    plan.fitnessTips.forEach((item) => {
      doc.text(`- ${item}`);
    });

    doc.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};