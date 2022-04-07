const express=require("express");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/admin/company/new").post(isAuthenticatedUser ,autherizeRoles("admin") ,createCompany) ;