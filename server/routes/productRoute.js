const express=require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviewsForSingleProduct, deleteSingleReviewOfTheSearchedProduct, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts) ;
router.route("/admin/products").get(isAuthenticatedUser,autherizeRoles("admin") , getAdminProducts) ;
router.route("/admin/product/new").post(isAuthenticatedUser ,autherizeRoles("admin") ,createProduct) ;
router.route("/admin/product/:id").put(isAuthenticatedUser,autherizeRoles("admin") , updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser,autherizeRoles("admin")  , deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/products/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser , createProductReview)
router.route("/allreviews").get(getAllReviewsForSingleProduct)
router.route("/admin/review/delete").put(isAuthenticatedUser , autherizeRoles("admin") , deleteSingleReviewOfTheSearchedProduct)



module.exports = router