import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
     },   
    
    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },
    tests:[{                    //al tests created by the users
        type:mongoose.Types.ObjectId,
        ref:"Test",
        required:true
    }]
},
{
    timestamps:true,
});

export default mongoose.model("User",userSchema);