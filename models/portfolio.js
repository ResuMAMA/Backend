const mongoose=require('mongoose');
const portfolioSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    social_links:{
        linkedIn:String,
        github:String,
    },
    about:{
        type:String,
        required:true
    },
    skills:[],
    projects:[{
        title:String,
        description:String,
        image_url:String
    }],
    experience:[{
        title:String,
        description:String
    }]


})


module.exports=mongoose.model(portfolioSchema,"Portfolio");