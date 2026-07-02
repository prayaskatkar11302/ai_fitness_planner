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


const getFallbackPlan = (fitnessDetails) => {
  const {
    gender,
    fitnessGoal,
    activityLevel
  } = fitnessDetails;

  let workoutPlan = [];
  let dietSuggestions = [];
  let calories = "";

  if (fitnessGoal === "Weight Loss") {
    workoutPlan = [
      "30 min brisk walk",
      "Jumping Jacks - 3 sets",
      "Bodyweight Squats - 3 sets",
      "Mountain Climbers - 3 sets",
      "Stretching - 10 min"
    ];

    dietSuggestions = [
      "High-protein meals",
      "Reduce sugar",
      "Drink 3L water"
    ];

    calories = "1800-2200 kcal";
  }

  if (fitnessGoal === "Muscle Gain") {
    workoutPlan = [
      "Bench Press",
      "Squats",
      "Deadlifts",
      "Pull-ups",
      "Shoulder Press"
    ];

    dietSuggestions = [
      "Chicken/Fish/Eggs",
      "Rice & Oats",
      "Protein Shake"
    ];

    calories = "2600-3000 kcal";
  }

  if (gender === "Female") {
    workoutPlan.push("Yoga 20 minutes");
  } else {
    workoutPlan.push("Push-ups 3 sets");
  }

  return {
    workoutPlan,
    dietSuggestions,
    dailyCalorieRecommendation: calories,
    weeklyFitnessSchedule: [
      "Monday - Workout",
      "Tuesday - Cardio",
      "Wednesday - Rest",
      "Thursday - Workout",
      "Friday - Cardio",
      "Saturday - Full Body",
      "Sunday - Rest"
    ],
    fitnessTips: [
      "Sleep 7-8 hours",
      "Stay hydrated",
      "Exercise consistently"
    ],
    weeklyMotivationMessage:
      "Small progress every day leads to big results."
  };
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
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


    return JSON.parse(cleanedText);


  } catch (error) {


    console.log(
      "Gemini Error:",
      error.message
    );


    // if Gemini busy
    if (error.status === 503) {
      console.log("Returning fallback plan");

      return getFallbackPlan(fitnessDetails);
    }


    throw new Error(
      "Failed to generate fitness plan"
    );

  }

};


export default generateFitnessPlan;