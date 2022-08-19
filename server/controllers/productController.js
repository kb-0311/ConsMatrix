const Product = require("../models/productModel") ;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require ("../middleware/catchAsyncErros.js") ;
const ApiFeatures = require ("../utils/apifeatures");
const cloudinary = require("cloudinary");
// Create Product -- Admin
exports.createProduct = catchAsyncErrors( async (req , res , next) =>{
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id ;
    const product = await Product.create(req.body) ;

    res.status(201).json({
        success : true ,
        product
    })

})
// Getting all products 
exports.getAllProducts = catchAsyncErrors( async (req , res) =>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();


    //used for searching specific queries
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;
 const apiFeature2 = new ApiFeatures(Product.find(), req.query)
 .search()
 .filter()
 .pagination(resultPerPage);

  products = await apiFeature2.query;
    res.status(200).json({
        message : "route is ok" ,
        productCount ,
        products,
        resultPerPage,
        filteredProductsCount
    })

})

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
});

// Getting a single product 
exports.getProductDetails = catchAsyncErrors( async (req , res , next) =>{

    let product = await Product.findById(req.params.id);

    if (!product) {
        return  next(new ErrorHandler("product not found" , 404));
    } else {
        res.status(200).json({
            success : true ,
            
            product
        })
            

    }

})



// Updating a giving product --admin 
exports.updateProduct = catchAsyncErrors( async (req , res) =>{
    // req.params is the :id in the api route 
    let product = await Product.findById(req.params.id);

    if (!product) {

        return  next(new ErrorHandler("product not found" , 404));

    } else {

        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
              await cloudinary.v2.uploader.destroy(product.images[i].public_id);

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            }

            req.body.images = imagesLinks;
        }
        }
      
        product = await Product.findByIdAndUpdate(
            req.params.id , 
            // update to
            req.body , 
            {
                new : true ,
                runValidators : true ,
                useFindAndModify : false
        })

        res.status(200).json({
            success : true,
            message : "product succesfully updated",
            product
        })
    }
})

// Delete Product 
exports.deleteProduct = catchAsyncErrors ( async (req , res) =>{
    // req.params is the :id in the api route 
    let product = await Product.findById(req.params.id);
    
    if (!product) {

        return  next(new ErrorHandler("product not found" , 404));

    } else {

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }

        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success : true ,
            message : "deleted succesfully"
        })
            
    }
})

// Create tool review or Update tool review 

exports.createProductReview = catchAsyncErrors( async (req , res , next) =>{

    const { rating , comment , productId } = req.body ;

    const review = {
        user : req.user._id ,
        name : req.user.name ,
        rating : Number(rating) ,
        comment : comment ,


    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    let message = ""
    if (isReviewed) {
        product.reviews.forEach(rev =>{
            if(rev.user.toString()===req.user._id.toString()) {
                rev.rating=rating ,
                rev.comment=comment
            }
        })
        message = "review updated successfully"
        
    } else {
        product.reviews.push(review);
        
        message = "review added successfully"
    }
    product.numOfReviews = product.reviews.length;
    let avgerageRating = 0 ;
    product.reviews.forEach(rev =>{
        avgerageRating+=rev.rating
    })
     product.ratings = Number (avgerageRating/product.reviews.length);

     await product.save({validateBeforeSave : false});

     res.status(200).json({
         success : true ,
         message : message
     })
        
})

// Get all reviews 

exports.getAllReviewsForSingleProduct = catchAsyncErrors ( async (req ,res , next)=>{

    const product = await Product.findById(req.query.id) ;
    if (!product) {
        return  next(new ErrorHandler("product not found" , 404));
    }

    const reviewsForTheSearchedUtility = product.reviews ;

    res.status(200).json({
        success : true ,
        message : `here are all the reviews for the tool id: ${product._id} ` ,
        reviewsForTheSearchedUtility
    })
})

// Delete Review 

exports.deleteSingleReviewOfTheSearchedProduct = catchAsyncErrors ( async (req ,res , next)=>{
    const product = await Product.findById(req.query.productId) ;
    if (!product) {
        return  next(new ErrorHandler("product not found" , 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.reviewId.toString()) ;
        
    let avgerageRating = 0 ;
    reviews.forEach(rev =>{
        avgerageRating+=rev.rating
    })
    const ratings = reviews.length>0? Number (avgerageRating/reviews.length) : 0;
    
    const numOfReviews= reviews.length;

    await Product.findByIdAndUpdate(req.query.productId ,{

        ratings ,
        reviews ,
        numOfReviews 
    
     } ,
      {
         new:true ,
         runValidators :true ,
         useFindAndModify:false
      
     })

    res.status(200).json({
        success : true ,
        message : "review deleted successfully"
    })
})