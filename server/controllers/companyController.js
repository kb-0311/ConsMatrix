const Product = require("../models/productModel") ;
const Company = require("../models/companyModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require ("../middleware/catchAsyncErros.js") ;
const ApiFeatures = require ("../utils/apifeatures");
// Create Product -- Admin
exports.createCompany = catchAsyncErrors( async (req , res , next) =>{

    req.body.user = req.user.id ;
    const company = await Company.create(req.body) ;
            res.status(201).json({
                success : true ,
                    company
                })

    })