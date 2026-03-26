const app = require("./app");
const db=require("./src/db/db");

const server=async()=>{
   await db();
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
}

module.exports=server;