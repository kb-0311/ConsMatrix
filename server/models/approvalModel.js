const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema({
    
    approvalItems : [{
        product : {
            type:mongoose.Schema.ObjectId ,
            ref : "Product",
            required : true ,
        } ,
        quantity : {
            type:Number,
            required:true,
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
        default : "Processing !" 
    },
    outSourcer :{
        type : String ,
        required :true ,
        default:"common"
    },
    department :{
        type : String ,
        required :true ,
        default:"Civil"
    },
    country :{
        type : String ,
        required :true ,
        default:"India"
    },
    state :{
        type : Number ,
        required :true ,
        
    },

})

module.exports = mongoose.model("Approval" , approvalSchema)