


const mongoose=require("mongoose");
const FoodPartnerSchema=new mongoose.Schema(
    {
      name:{
          type:String,
          required:true,
       },
       email: {
        type: String,
        required: true,
        unique: true
    },
       password:{
         type:String,
         required:true
    }

    }
);

const FoodPartner = mongoose.model("FoodPartner", FoodPartnerSchema);
module.exports = FoodPartner;
