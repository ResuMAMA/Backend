const jwt=require('jsonwebtoken')
const CREDS=process.env.jwtSecrete;
const createError =require('http-errors')
module.exports=(req,res,next)=>{
    console.log(req.headers)
    if(!req.headers.authorization){
    return next(createError.Unauthorized());
    }

    const header=req.headers.authorization;
    const bearerToken=header.split(' ');
    const token=bearerToken[1];
    jwt.verify(token,CREDS,(err,payload)=>{
        if(err){
        return next(createError.Unauthorized())
        }
        req.payload=payload;
        next();
        
    });

}