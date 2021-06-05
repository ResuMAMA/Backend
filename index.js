const express = require('express');
const app = express();

// auth routes
const authRoute=require('./routes/auth');
app.use('/api',authRoute);

const PORT =process.env.PORT||8080;
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
