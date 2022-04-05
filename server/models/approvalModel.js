const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema({
    
    approvalItems : [{
        product : {
            type:mongoose.Schema.ObjectId ,
            ref : "Product",
            required : true ,
        }
    }] ,
    user : {
        type:mongoose.Schema.ObjectId ,
        ref : "User",
        required : true ,
    } , 
    approvedAtTime : {
        type : Date ,
        required : true,
        default : Date.now()
    } , 
    approvalStatus : {
        type : String ,
        required : true ,
        default : "success !" 
    }
})

module.exports = mongoose.model("Approval" , approvalSchema)