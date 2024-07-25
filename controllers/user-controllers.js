import usermodels from "../models/usermodels.js";
import bcrypt from "bcryptjs";


export const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await usermodels.find();
    }catch(err){
        return console.log(err);
    }
    if(!users){
        return res.status(400).json({message:"No users Found"});
    }
    return res.status(200).json({users});

};

export const signin=async(req,res,next)=>{
    const {username,email,password}=req.body;
    let existinguser;
    try{
        existinguser=await usermodels.findOne({email})
    }catch(err){
        return console.log(err);
    }
    if(existinguser)
    {
        return res.status(400).json({message:"user already existing! Login instead"});
    }
    const hashpassword=bcrypt.hashSync(password)
    const user=new usermodels({
        username,
        email,
        password:hashpassword,
        test:[]
    });

    try{
        await user.save();
     }catch(err){
        return console.log(err);
     }
     return res.status(201).json({user})

};
export const Login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existinguser;
    try{
        existinguser=await usermodels.findOne({email})
    }catch(err){
        return console.log(err);
    }
    if(!existinguser){
        return res.status(404).json({message:"user not found"});
    }
   const Password=bcrypt.compareSync(password,existinguser.password)
   if(!Password){
    return res.status(400).json({message:"incorrect password"});

}
return res.status(200).json({message:"Login Successfull"})
};