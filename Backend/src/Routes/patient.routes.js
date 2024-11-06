import { Router } from "express";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addDoctor, addReport, getDoctorList, getReportList, queryReports, removeDoctor, removeReport, reportAddSignedURL } from "../Controllers/patient.controller.js";

const router = Router();

// secured routs
router.route("/getDoctorList").post(verifyJWT, getDoctorList);
router.route("/addDoctor").post(verifyJWT, addDoctor);
router.route("/getReportList").post(verifyJWT, getReportList);
router.route("/addReport").post(verifyJWT, addReport);
router.route("/removeDoctor").post(verifyJWT, removeDoctor);
router.route("/reportAddSignedURL").post(verifyJWT, reportAddSignedURL);
router.route("/removeReport").post(verifyJWT, removeReport);
router.route("/queryReports").post(verifyJWT, queryReports);

export default router;