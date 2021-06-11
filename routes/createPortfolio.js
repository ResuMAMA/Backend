const express=require('express');
const router=express.Router();

router.post('/create_new',async (req,res)=>{
    res.send("creating portfolio");
})
router.get('/myportfolios',async(req,res)=>{
    const {user_id}=req.body;
    res.send(`getting for user: ${user_id}`);
})
router.get('/id',async (req,res)=>{
    const {id}=req.body;
    res.send(`getting for portfolio : ${id}`);
})

module.exports=router