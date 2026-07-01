import mongoose from "mongoose";


const fitnessPlanSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },


  fitnessDetails:{
    type:Object,
    required:true
  },


  workoutPlan:{
    type:[String],
    required:true
  },


  dietSuggestions:{
    type:[String],
    required:true
  },


  dailyCalorieRecommendation:{
    type:String,
    required:true
  },


  weeklyFitnessSchedule:{
    type:[String],
    required:true
  },


  fitnessTips:{
    type:[String],
    required:true
  },


  weeklyMotivationMessage:{
    type:String,
    required:true
  },


  createdAt:{
    type:Date,
    default:Date.now
  }


});


export default mongoose.model(
  "FitnessPlan",
  fitnessPlanSchema
);