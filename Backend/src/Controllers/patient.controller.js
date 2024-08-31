import { asyncHandler } from '../Utils/asyncHandler.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import { User } from '../Models/user.model.js'; // Ensure correct import paths
import { Patient } from '../Models/patient.model.js';
import { Doctor } from '../Models/doctor.model.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getDoctorList = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('patientDetails');

        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }

        const patient = await Patient.findById(user.patientDetails._id).populate('doctorsList');

        if (!patient) {
            throw new ApiError(404, 'Patient details not found');
        }

        return res.status(200).json(
            new ApiResponse(200, patient.doctorsList, 'Doctor list retrieved successfully')
        );
    } catch (error) {
        console.error("Error in getDoctorList:", error); // Log the actual error for better debugging
        throw new ApiError(500, 'Something went wrong in getDoctorList');
    }
});

const addDoctor = asyncHandler(async (req, res) => {
    try {
        const { doctorGeneratedOneTimeToken } = req.body;

        // Verify the token
        const decoded = jwt.verify(doctorGeneratedOneTimeToken, process.env.DOCTOR_TOKEN_SECRET);
        const doctorId = decoded._id; // Assuming the doctor ID is stored as _id in the token payload

        // Find the user (patient) by ID
        const user = await User.findById(req.user._id).populate('patientDetails');
        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }

        // Find the doctor by the decoded doctorId
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            throw new ApiError(404, 'Doctor not found');
        }

        // Add doctor to patient's doctorsList
        const patient = await Patient.findById(user.patientDetails._id);
        if (!patient.doctorsList.includes(doctor._id)) {
            patient.doctorsList.push(doctor._id);
            await patient.save();
        }

        // Add patient to doctor's patientsList
        if (!doctor.patientsList.includes(patient._id)) {
            doctor.patientsList.push(patient._id);
            await doctor.save();
        }

        // Return the doctor's data
        return res.status(200).json(
            new ApiResponse(200, doctor, 'Doctor added successfully')
        );
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Invalid or expired token');
        }
        throw new ApiError(500, 'Something went wrong in addDoctor');
    }
});

const getReportList = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('patientDetails');
        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }
        const patient = await Patient.findById(user.patientDetails._id).populate('reportsList');
        if (!patient) {
            throw new ApiError(404, 'Patient details not found');
        }

        return res.status(200).json(
            new ApiResponse(200, patient.reportsList, 'Report list retrieved successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in getReportList');
    }
});

const addReport = asyncHandler(async (req, res) => {
    try {
        const { reportName, location, reportDate } = req.body;
        const user = await User.findById(req.user._id).populate('patientDetails');

        if (!user || !user.patientDetails) {
            throw new ApiError(404, 'Patient not found');
        }

        const patient = await Patient.findById(user.patientDetails._id);

        // Upload PDF to Cloudinary
        const pdfPath = req.file.path; // Multer stores the file temporarily
        const pdfUploadResponse = await cloudinary.uploader.upload(pdfPath, {
            resource_type: 'raw',
            folder: 'reports'
        });

        // Get a preview image from the uploaded PDF
        const pdfPublicId = pdfUploadResponse.public_id;
        const previewImageUrl = cloudinary.url(`${pdfPublicId}.pdf`, {
            resource_type: 'image',
            format: 'jpg', // Output format (jpg, png, etc.)
            page: 1,       // Specify which page to generate preview from
            transformation: [
                { width: 300, height: 400, crop: 'scale' } // Resize options
            ]
        });

        // Add report details to patient's reportsList
        const newReport = {
            previewImgLink: previewImageUrl,
            reportName,
            reportDate,
            location,
            reportPDFLink: pdfUploadResponse.secure_url,
        };

        patient.reportsList.push(newReport);
        await patient.save();

        // Cleanup: Remove files from local storage
        fs.unlinkSync(pdfPath);
        fs.unlinkSync(previewImagePath);

        return res.status(200).json(
            new ApiResponse(200, newReport, 'Report added successfully')
        );
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in addReport');
    }
});

export {
    getDoctorList,
    addDoctor,
    getReportList,
    addReport,
};
