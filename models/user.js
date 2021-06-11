const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const CREDS =require('../creds')
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]


})

UserSchema.methods.generateToken=async function(){
    try{
    const token=await jwt.sign({_id:this._id.toString()},CREDS.jwtSecrete);
   // console.log(token);
    this.tokens=this.tokens.concat({token:token})
    await this.save();
    return token;
    }catch(error){
        console.log("error at token generate");
    }

}
/**
 * 
 * 
 * 
 * 
 */


module.exports=mongoose.model("User",UserSchema);