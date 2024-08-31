import { Router } from "express";
import { 
    registerLoginUser,
    verifyOTP,
    resendOTP,
    generateNewPassword,
    refreshAccessToken,
    verifyAccessToken,
    logoutUser,
    changeCurrentPassword,
    deleteUserByPhone,
    setDoctor,
 } from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(registerLoginUser);
router.route("/verifyOTP").post(verifyOTP);
router.route("/resendOTP").post(resendOTP);
router.route("/generateNewPassword").post(generateNewPassword);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/setDoctor").post(setDoctor);

// secured routs
router.route("/verifyAccessToken").post(verifyJWT, verifyAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/changePassword").post(verifyJWT, changeCurrentPassword);
router.route("/deleteUser").post(verifyJWT, deleteUserByPhone);

export default router;