const mongoose= require("mongoose");
const companySchema= new mongoose.Schema({
        companyname : {
        type : String , 
        required : [true , "Please enter valid  name"] ,
        maxLength : [30 , "name cannot exceed more than 30 characters"] ,
        minLength : [4 , "name cannot be less than 4 characters"]

    },
    companyProducts: {
        type : Array,
        
    },
    averageRatingCompany:{
        type:Number
    }
})

module.exports= mongoose.model("Company" , companySchema);
