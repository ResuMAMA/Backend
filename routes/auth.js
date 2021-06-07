const express=require('express');
const router=express.Router();
const User=require('../models/user')
const bcrypt=require('bcrypt')

router.post('/register', async (req,res)=>{
    
    const uu=req.body.username
    const em=req.body.email
    const plainPassword=req.body.password
  
    
    if(!uu || typeof uu !=='string'){
        return res.json({status:'error',error:'username must be of string'});
        }
    else if(!plainPassword || typeof plainPassword !=='string')
        {
            return res.json({status:'error',error:'password must be of type string'})
        }
  try{
      const hashpassword=await bcrypt.hash(plainPassword,10);
      const newUser=new User({
        username:uu,
        email:em,
        password:hashpassword,
        
    })
      const token=await newUser.generateToken();
      
      
      const userCreated=await newUser.save();
      res.status(200).json({message:"SUCCESS",data:userCreated})


      }catch(err){
          res.status(400).json({message:"FAILED"})
          console.log("error at register "+err);
      }

})

router.post('/login', async (req,res)=>{

   const email=req.body.email
   const plainPassword=req.body.password
   const loginUser=await User.findOne({email:email});
   if(!loginUser)
   res.status(400).json({message:"INVALID CREDENTIALS"});
   const isMatch= await bcrypt.compare(plainPassword,loginUser.password);

   const mytoken= await loginUser.generateToken();

   if(isMatch){
       res.status(200).json({message:"LOGIN SUCCESS",data:{token:mytoken,id:loginUser._id}});
     }
   else
   res.status(400).json({message:"INVALID CREDENTIALS"});
   

})

module.exports=router