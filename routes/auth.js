const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


router.post('/register',(req,res)=>{

   res.send('you are going to register');
})

router.post('/login',(req,res)=>{
    res.send('login');
})

module.exports=router