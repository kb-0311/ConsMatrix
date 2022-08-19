const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require("path");
const app = express();
app.use(fileUpload());



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true },{limit : '50mb'}));
app.use(cookieParser());
//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/error");
const approvals = require("./routes/approvalRoute");


// Using the routes
app.use("/api/v1"   ,   product);
app.use("/api/v1" , user);
app.use("/api/v1" , approvals)
//Middleware for error ,

app.use(errorMiddleware);
app.use(express.static(path.join(__dirname ,"../client/build")));

app.get("*" , (req , res)=>{
    res.sendFile(path.resolve(__dirname ,"../client/build/index.html"))
})

module.exports= app;
