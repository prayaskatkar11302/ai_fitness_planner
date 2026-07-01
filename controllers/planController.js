import FitnessPlan from "../models/FitnessPlan.js";
import generateFitnessPlan from "../services/aiService.js";


// ===============================
// Generate Fitness Plan
// ===============================
export const generatePlan = async (req, res) => {

  try {

    const fitnessDetails = req.body;


    // Generate AI plan
    const aiPlan = await generateFitnessPlan(
      fitnessDetails
    );


    // Save in MongoDB
    const savedPlan = await FitnessPlan.create({

      userId: req.user.id,

      fitnessDetails,

      workoutPlan:
        aiPlan.workoutPlan,

      dietSuggestions:
        aiPlan.dietSuggestions,

      dailyCalorieRecommendation:
        aiPlan.dailyCalorieRecommendation,

      weeklyFitnessSchedule:
        aiPlan.weeklyFitnessSchedule,

      fitnessTips:
        aiPlan.fitnessTips,

      weeklyMotivationMessage:
        aiPlan.weeklyMotivationMessage

    });



    res.status(201).json({

      success:true,

      message:"Fitness plan generated successfully",

      plan:savedPlan

    });


  } catch(error){


    console.error(
      "Generate Plan Error:",
      error
    );


    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};




// ===============================
// Get All Plans Of Logged User
// ===============================
export const getAllPlans = async(req,res)=>{


 try{


  const plans =
    await FitnessPlan.find({
      userId:req.user.id
    })
    .sort({
      createdAt:-1
    });



  res.status(200).json({

    success:true,

    count:plans.length,

    plans

  });



 }catch(error){


  console.error(error);


  res.status(500).json({

    success:false,

    message:"Failed to fetch plans"

  });


 }


};





// ===============================
// Get Single Plan
// ===============================
export const getPlanById = async(req,res)=>{


 try{


  const plan =
    await FitnessPlan.findOne({

      _id:req.params.id,

      userId:req.user.id

    });



  if(!plan){

    return res.status(404).json({

      success:false,

      message:"Plan not found"

    });

  }



  res.status(200).json({

    success:true,

    plan

  });



 }catch(error){


  console.error(error);


  res.status(500).json({

    success:false,

    message:"Failed to fetch plan"

  });


 }


};






// ===============================
// Delete Plan
// ===============================
export const deletePlan = async(req,res)=>{


 try{


  const plan =
    await FitnessPlan.findOneAndDelete({

      _id:req.params.id,

      userId:req.user.id

    });



  if(!plan){

    return res.status(404).json({

      success:false,

      message:"Plan not found"

    });

  }



  res.status(200).json({

    success:true,

    message:"Plan deleted successfully"

  });



 }catch(error){


  console.error(error);


  res.status(500).json({

    success:false,

    message:"Failed to delete plan"

  });


 }


};