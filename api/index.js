const express =  require('express');
const app = express();
const dotenv = require('dotenv');

// підключення монгуса
const mongoose = require("mongoose");

dotenv.config();

// підключення монго дб
mongoose.connect(process.env.MONGO_URL)
.then(
    console.log('connected mongo')
)
.catch( err => {
    console.log(err)
});



app.use('/hello', (req, res)=> {
    console.log('this is main url');
});

app.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });

app.listen(5000, () => {
    console.log('Backend is runningggg.');
});