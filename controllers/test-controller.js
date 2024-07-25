import User from "../models/usermodels.js";
import Test from"../models/qnamodel.js";
import axios from 'axios';


//display all the test for dashboard:

export const getalltestofuser=async(req,res,next)=>{
    const userid=req.params.id;
    let usertest;
    try{
        usertest=await Test.findById(userid).populate("tests");
    }catch(err){
        return console.log(err)
    }
    if(!usertest){
        return res.status(404).json({message:"no test found"})
    }
    return res.status(200).json({tests:usertest})   //usertest will contain the array(value) of the tests(key)
};

//fetching questions,ai answers and no.of questions from the flaskapi and give it to the frontend:
export const getquestions=async(req,res,next)=>{
     let questions,ai_answers;
     let response,existinguser;
     try {
        // Make a GET request to your Flask API using Axios
         response = await axios.get('http://flask-api-url/data');
         questions = response.data.qna_pairs.map(qna => qna.question);  
         ai_answers=response.data.qna_pairs.map(qna=>qna.ai_generated_answer);
        // Send the data received from the Flask API as the response
        res.json(questions,ai_answers,response.data.count);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data from Flask API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Flask API' });
      }
      const {testname,question_type,subject,chapter_name,count,qna_pair,user}=response.data;
      try{
        existinguser=await User.findById(user);
       }catch(err){
        return console.log(err)
       }
       if(!existinguser){
        return res.status(400).json({message:"Uable to find the user by this is"})
       }
        //storing in db
      const test=new Test({
        testname,
        question_type,
        subject,
        chapter_name,
        count,
        qna_pair});
        try{
            const session= await mongoose.startSession();   //establishing the connection between the test and the user
            session.startTransaction();
            await test.save({session});
            existinguser.tests.push(blog);
            await existinguser.save({session})
            await session.commitTransaction();
            return console.log("test saved in the database");
        }catch(err){
            console.log(err);
            res.status(500).json({message:err});
        } 
        return res.status(200).json({test})  
        
        //taking dta from the db
    // try{
    //     test=
    //  questions = test.qna_pairs.map(qna => qna.question);  
    //  while(!questions)  
    //  {
    //     await wait(5000);
    //  }
    // }catch(err){
    //     return console.log(err)
    // }
    // if(!test){
    //     return res.status(404).json({message:"no test found"})
    // }
    // return res.status(200).json({questions})
};

//storin the answers in the backend
export const useranswers=async(req,res,next)=>{
    const {user_ans,feedback}=req.body;
    const testid=req.params.id;
    let test;
    try{
        test=await Test.findByIdAndUpdate(testid,{
            user_ans,
            feedback
        }, { new: true })
    }catch(err){
        return console.log(err)
    }
    if(!test){
        return res.status(500).json({message:"unable to update the answers and feedback"})
    }
    return res.status(200).json({test})

};

//searching a particular test by id
// export const getById=async(req,res,next)=>{
//     const id=req.params.id;
//     let test;
//     try{
//         test=await Test.findById(id);
//     }catch(err){
//         return console.log(err);
//     }
//     if(!test){
//         return res.status(404).json({message:"No test found"})
//     }
//     return res.status(200).json({test});
// };

