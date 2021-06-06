const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const CREDS=require('./creds');
const db=CREDS.DB;
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

const PORT =process.env.PORT||8080;
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
