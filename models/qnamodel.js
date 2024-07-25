import mongoose from "mongoose";

const Schema = mongoose.Schema;

const qnaSchema=new Schema({
  question:String,
  ai_generated_answer:String,
  user_ans:String,
  feedback:Number
})
const testSchema = new Schema({     //schema of each test attend by the user
    testname: {
      type:String,
      required:true,
      index: true
    },
    question_type:{                 //type:(fitb,mcq,true&flase)
      type:String,
      required:true,
    },
    subject:{                       //subject name
      type:String,
      required:true,
      index: true
    },
    chapter_name:{                  //name of the chapter
      type:String,
      required:true,
      index: true
    },
    count:Number,                   //to count the of the qna 
    qna_pairs:[qnaSchema],          //arrays of the qna schema
    correct_answers:Number ,          //to count the corrct no of question
    
    user:{                          //info about the user to connect to the uer modules
      type:mongoose.Types.ObjectId,
      ref:"User",
      required:true,
  }
},
{
   timestamps: true 
});
export default mongoose.model('Test',testSchema);
