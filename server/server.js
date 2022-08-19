const app = require ("./app");

const cloudinary = require('cloudinary');

const dotenv = require("dotenv");

const connectDatabase = require ("./config/database");

// config 
if (process.env.NODE_ENV!="PRODUCTION") {
    
    dotenv.config({path : "server/config/config.env"});

}

//connecting the database

connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key :process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT , () =>{

    console.log(`server started on port ${process.env.PORT}`);

})
// Uncaught Exception 
process.on("uncaughtException" , (err)=> {
    console.log(err.message);
    console.log("server shutting down" );
    server.close(()=>{
        process.exit(1);
    });
})

// Unhandled Promise errors
process.on("unhandledRejection" , (err)=> {
    console.log(err.message);
    console.log("server shutting down" );
    server.close(()=>{
        process.exit(1);
    });
})