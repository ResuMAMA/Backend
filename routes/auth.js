const express=require('express');
const router=express.Router();
const User=require('../models/user')
const bcrypt=require('bcrypt')

///-----------register

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

///--------------login 
router.post('/login', async (req,res)=>{

   const email=req.body.email
   const plainPassword=req.body.password
   const loginUser=await User.findOne({email:email});
   if(!loginUser){
   res.status(400).json({message:"INVALID CREDENTIALS"});
   }
   const isMatch= await bcrypt.compare(plainPassword,loginUser.password);

   const mytoken= await loginUser.generateToken();

   if(isMatch){
       res.status(200).json({message:"LOGIN SUCCESS",data:{token:mytoken,id:loginUser._id}});
     }
   else{
   res.status(400).json({message:"INVALID CREDENTIALS"});
   }
   

})

//---------change password
router.post('/changePassword',async (req,res)=>{
    const {userId,oldPassword,newPassword}=req.body;
   // console.log(userId+" "+oldPassword+" "+newPassword)
    try{
        const requestUser=await User.findOne({_id:userId});
        if(!requestUser){
          //  console.log("no user found")
            return res.status(400).json({message:"Invalid credentials,no user"});}
        //console.log(requestUser.password)
        const isMatch=await bcrypt.compare(oldPassword,requestUser.password);
        if(!isMatch){
            //console.log("old pass no match")
         return res.status(400).json({message:"Invalid credentials,no match"})
        }

    const hashpassword=await bcrypt.hash(newPassword,10);
    //console.log(hashpassword)
    const result=await User.updateOne({_id:userId},{
        $set : {
            password:hashpassword
        }
    })
       res.status(200).json({message:"success"})
    }catch(err){
        //console.log(err)
         res.status(400).json({message:"failed"});
    }
})

//--------------------------forgot password

router.post('/forgotPassword',async(req,res)=>{
    const {email,newPassword}=req.body;
    try{
           const requestUser=await User.findOne({email:email});
           if(requestUser==null){
               return res.status(401).json({message:"Invalid email"})
           }
           const hashpassword=await bcrypt.hash(newPassword,10);
           const result = await User.findOneAndUpdate({_id:requestUser._id},{
               $set:{
                   password:hashpassword
               }
           })

           res.status(200).json({message:"success"});

    }catch(err){
        res.status(400).json({message:"failed"});
    }
})


module.exports=router


