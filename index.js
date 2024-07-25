import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import testrouter from "./routes/test-routes.js";
const app=express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/test",testrouter);

mongoose.connect('mongodb+srv://admin:eduquest@cluster0.h5cevq7.mongodb.net/Eduquest?retryWrites=true&w=majority&appName=Cluster0'
).then(()=>app.listen(3000))
.then(()=>console.log("connected to the database"))
.catch((err)=>console.log(err));
