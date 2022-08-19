const Approval = require("../models/approvalModel") ;
const Product = require("../models/productModel") ;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErros");
const { type } = require("express/lib/response");


// tester  creating an approval
exports.newApprovals = catchAsyncErrors (async (req,res,next) =>{

    
    req.body.user = req.user._id
    const approval = await Approval.create(req.body);
    approval.approvalItems.forEach(product => {
        updateProductAprrovals(product.product);
    })
    res.status(201).json({
        success : true ,
        message : "approved",
        approval : approval ,
    })
})

//searching for a single approval
exports.getSingleApproval = catchAsyncErrors (async (req, res, next) =>{

    const approval = await Approval.findById(req.params.id).populate("user approvalItems.product")
    if(!approval) {
        return(next(new ErrorHandler("approval not found!" , 404)))
    }
    res.status(200).json({
        success : true ,
        approval,
    })

})

//getting all the approvals for the logged in tester
exports.getApprovalsforTheLoggedTester = catchAsyncErrors(async (req,res,next)=>{
    const yourApprovals = await Approval.find({user : req.user._id})
    
    if (!yourApprovals) {
        return (next(new ErrorHandler("you have not placed any approvals yet" , 404)))
    }

    res.status(200).json({
        success : true ,
        yourApprovals
    })
})

//getting all the approvals
exports.gettingAllApprovals= catchAsyncErrors(async (req,res,next)=>{
    const allApprovals = await Approval.find().populate("approvalItems.product")
    const totalApprovalCount = await Approval.countDocuments();

    if (!allApprovals) {
        return (next(new ErrorHandler("you have not placed any approvals yet" , 404)))
    }

    res.status(200).json({
        success : true ,
        totalApprovalCount : totalApprovalCount,
        allApprovals
    })
})

// updating an approval 

exports.updateSingleApproval = catchAsyncErrors (async (req, res, next) =>{

    let approval = await Approval.findById(req.params.id).populate("user");
    if(!approval) {
        return(next(new ErrorHandler("approval not found!" , 404)))
    }

    if (req.body.approvalStatus === "Approved") {
        approval.approvalItems.forEach(async (approval) => {
          await updateStock(approval.product, approval.quantity);
        });
      }

    updatedApproval = await Approval.findByIdAndUpdate(
        req.params.id , 
        // update to
        req.body , 
        {
            new : true ,
            runValidators : true ,
            useFindAndModify : false
        }
    )

    res.status(200).json({
        success : true ,
        updatedApproval,
    })

})

//funtion to update approval stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }

// when an approval is made updates the number of count for a given product


async function updateProductAprrovals (id) {
    const product = await Product.findById(id);
    product.numberOfApprovals+=1;

    await product.save({validateBeforeSave : false});

}

// deleting an approval 

exports.deleteApproval = catchAsyncErrors(async (req,res,next) =>{
    const approval = await Approval.findById(req.params.id);
    if(!approval) {
        return(next(new ErrorHandler("approval not found!" , 404)))
    }
    approval.approvalItems.forEach(product => {
        deleteProductAprrovals(product.product);
    })
    await Approval.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success : true ,
        message : "approval successfully deleted"
    })



})

async function deleteProductAprrovals (id) {
    const product = await Product.findById(id);
    product.numberOfApprovals-=1;

    await product.save({validateBeforeSave : false});

}