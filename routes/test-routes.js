import express from "express"
import { getalltestofuser, getquestions, useranswers } from "../controllers/test-controller.js";

const testrouter=express.Router();

testrouter.get("/user/:id",getalltestofuser);     //for dashboard where all the test will be displayed
testrouter.get("/questions",getquestions);      //displaying questions 
testrouter.put("/useresponse",useranswers);        //storin anser of the user
// testrouter.get("/feedback",getfeedback);        //displaying feedback already 


export default testrouter;