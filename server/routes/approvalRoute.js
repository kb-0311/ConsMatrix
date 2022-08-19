const { newApprovals, getSingleApproval, getApprovalsforTheLoggedTester, gettingAllApprovals, updateSingleApproval, deleteApproval } = require("../controllers/approvalController");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.route("/approval/new").post(isAuthenticatedUser , newApprovals);
router.route("/approval/:id").get(isAuthenticatedUser , getSingleApproval )
router.route("/approvals/myapprovals").get(isAuthenticatedUser , getApprovalsforTheLoggedTester )
router.route("/allapprovals").get(isAuthenticatedUser,autherizeRoles("admin") , gettingAllApprovals )
router.route("/approval/:id").put(isAuthenticatedUser, autherizeRoles("admin") , updateSingleApproval )
router.route("/approval/:id").delete(isAuthenticatedUser, autherizeRoles("admin") , deleteApproval )




module.exports = router