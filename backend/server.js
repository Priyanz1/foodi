const app = require("./app");
const db=require("./src/db/db");

const server=async()=>{
   try {
      await db();
      app.listen(process.env.PORT,()=>{
          console.log(`server is running on port ${process.env.PORT}`);
      });
   } catch (error) {
      console.error("Server startup failed:", error.message);
      process.exit(1);
   }
}

module.exports=server;