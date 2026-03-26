const mongoose=require("mongoose");
const FoodModel=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        video:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        foodPartner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodPartner"
        },
        count:{
            type: Number,
            default: 0
        }
    }
)
module.exports = mongoose.model("Food", FoodModel);