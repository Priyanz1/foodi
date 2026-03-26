const mongoose=require("mongoose");
const db=async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/foodi");
    }catch(err){
  
    }
}
module.exports=db;