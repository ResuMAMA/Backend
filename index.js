const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db="mongodb+srv://Rishika:resuMAMA@cluster0.2pxmk.mongodb.net/resuMAMA?retryWrites=true&w=majority"
mongoose.connect(db,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(()=>{console.log("db connected")}).catch((err)=>{
  console.log(err);}
  )

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
