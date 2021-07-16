const express=require('express');
const router=express.Router();
const Portfolio=require('../models/portfolio')
const tokenVerifier=require('../middleware')

router.post('/create_new',tokenVerifier,async (req,res)=>{
   
    try{
        console.log(req.body)
    const new_portfolio=await new Portfolio(req.body);
    const created=await new_portfolio.save();
    res.status(200).json({message:"created portfolio"});
    }catch(error){
      res.status(201).json({error:"could not build portfolio"})
    }
})
router.get('/myportfolios',tokenVerifier,async(req,res)=>{
    const {user_id}=req.body;
    console.log(user_id)
    try{
       const portFolios=await Portfolio.find({user_id:user_id});
       res.status(200).json(portFolios);
    }catch(error){
         res.status(400).json({message:"Could not fetch portfolios"})
    }
})
router.get('/portfolio.me',async (req,res)=>{
    const {id}=req.body;
    try{
      const portFolioData=await Portfolio.find({_id:id});
      res.status(200).json(portFolioData)
    }catch(error){
        res.status(400).json({message:"Not found"});
    }
})

module.exports=router