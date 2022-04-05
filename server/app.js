const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
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


module.exports= app;
