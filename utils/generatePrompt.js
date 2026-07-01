const generatePrompt = (fitnessDetails) => {
  const {
    name,
    age,
    gender,
    height,
    weight,
    fitnessGoal,
    activityLevel,
    workoutDaysPerWeek,
  } = fitnessDetails;

  return `
You are an experienced fitness trainer and certified nutritionist.

Generate a personalized fitness plan for the following user.

User Details:
--------------
Name: ${name}
Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
Fitness Goal: ${fitnessGoal}
Activity Level: ${activityLevel}
Workout Days Per Week: ${workoutDaysPerWeek}

Instructions:
1. Recommend a workout plan based on the user's goal.
2. Suggest a simple, balanced diet.
3. Recommend an approximate daily calorie intake.
4. Create a weekly workout schedule.
5. Give at least 5 practical fitness tips.
6. Write a short motivational message.

IMPORTANT:
Return ONLY valid JSON.

JSON Format:

{
  "workoutPlan": "string",
  "dietSuggestions": "string",
  "dailyCalorieRecommendation": "string",
  "weeklyFitnessSchedule": "string",
  "fitnessTips": "string",
  "weeklyMotivationMessage": "string"
}

Do not include markdown, code blocks, or explanations.
`;
};

export default generatePrompt;