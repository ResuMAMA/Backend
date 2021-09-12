const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
//const CREDS=require('./creds');
const cors=require('cors')
require("dotenv").config();
const db="mongodb+srv://Rishika:resuMAMA@cluster0.2pxmk.mongodb.net/resuMAMA?retryWrites=true&w=majority";
app.use(cors());

mongoose.connect(db,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(()=>{console.log("db connected")}).catch((err)=>{
  console.log(err);}
  )
app.use(bodyparser());
  app.use(express.json());
// auth routes
const authRoute=require('./routes/auth');
app.use('/auth',authRoute);

//portfolio routes
const portfolioRoute=require('./routes/createPortfolio');
app.use('/portfolios',portfolioRoute);

const PORT =process.env.PORT||5000;
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
