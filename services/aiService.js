import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import generatePrompt from "../utils/generatePrompt.js";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});


const fallbackPlan = {
  workoutPlan: [
    "Warm up 10 minutes",
    "Push ups 3 sets",
    "Squats 3 sets",
    "Plank 30 seconds",
    "Walking 20 minutes"
  ],

  dietSuggestions: [
    "Protein rich foods",
    "Fruits and vegetables",
    "Drink enough water"
  ],

  dailyCalorieRecommendation:
    "2200 calories",

  weeklyFitnessSchedule: [
    "Monday - Strength",
    "Tuesday - Cardio",
    "Wednesday - Rest",
    "Thursday - Full Body",
    "Friday - Cardio",
    "Saturday - Stretching",
    "Sunday - Rest"
  ],

  fitnessTips: [
    "Sleep properly",
    "Stay hydrated",
    "Be consistent"
  ],

  weeklyMotivationMessage:
    "Consistency creates results."
};


const generateFitnessPlan = async (fitnessDetails) => {

  try {

    const prompt = generatePrompt(fitnessDetails);


    const result =
      await model.generateContent(prompt);


    const text =
      result.response.text();


    const cleanedText =
      text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();


    return JSON.parse(cleanedText);


  } catch(error){


    console.log(
      "Gemini Error:",
      error.message
    );


    // if Gemini busy
    if(error.status === 503){

      console.log(
        "Returning fallback plan"
      );

      return fallbackPlan;

    }


    throw new Error(
      "Failed to generate fitness plan"
    );

  }

};


export default generateFitnessPlan;