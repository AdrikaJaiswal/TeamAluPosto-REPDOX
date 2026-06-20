const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");


dotenv.config();


const app = express();


app.use(express.json());


connectDB();



app.get("/", (req,res)=>{

    res.send("KrishiLink Backend Running");

});


app.get("/test",(req,res)=>{

    res.json({
        message:"Backend is working"
    });

});


app.listen(3000,()=>{

    console.log("Server started on port 3000");

});