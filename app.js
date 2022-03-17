const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
dotenv.config();

/*app.get("/", (req, res) => {
	res.send("hello  world from node js")
});
*/

//db

mongoose.connect(process.env.MONGO_URI).then(() => {console.log("Espresso Ordered!")})


mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`);
})


//bring in routes
const postRoutes = require('./routes/post');

/*
const myOwnMiddleware = (req, res, next) => {
	console.log("drink more cofffeeee");
	next();
};
*/

//middleware
app.use(morgan('dev'));
//app.use(myOwnMiddleware); 

app.use(bodyParser.json())
app.use("/", postRoutes);
app.use(validationResult);



//app.listen(8080);
port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(` Node Js API is listening on port: ${port}`);
});

