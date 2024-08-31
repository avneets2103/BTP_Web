import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    sex: {
        type: String,
        required: true,
        enum: ['M', 'F'],
    },
    age: {
        type: Number,
        required: true,
    },
    currentCondition: {
        type: String,
        trim: true,
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    medicalHistorySummary: {
        type: String,
        trim: true,
    },
    currentSymptomsSummary: {
        type: String,
        trim: true,
    },
    assistiveDiagnosis: {
        type: String,
        trim: true,
    },
    reportsList: [
        {
            previewImgLink: {
                type: String,
                required: true,
            },
            reportName: {
                type: String,
                required: true,
            },
            reportDate: {
                type: Date,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            reportPDFLink: {
                type: String,
                required: true,
            }
        }
    ],
    doctorsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
        }
    ],
}, { timestamps: true });

export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
