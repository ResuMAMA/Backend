const jwt=require('jsonwebtoken')
const CREDS=require('./creds')
const createError =require('http-errors')
module.exports=(req,res,next)=>{
    if(!req.headers['authorization'])
    return next(createError.Unauthorized());

    const header=req.header('authorization');
    const bearerToken=header.split(' ');
    const token=bearerToken[1];
    jwt.verify(token,CREDS.jwtSecrete,(err,payload)=>{
        if(err){
        return next(createError.Unauthorized())
        }
        req.payload=payload;
        next();
        
    });

}