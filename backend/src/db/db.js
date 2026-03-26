const mongoose=require("mongoose");
const db=async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
    }catch(err){
      console.log("yahi he",err);
    }
}
module.exports=db;