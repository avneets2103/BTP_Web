export interface PatientSchema{
    id?: string;
    sex?: string;
    age?: string;
    img?: string;
    currentCondition?: string;
    bloodGroup?: string;
    medicalHistorySummary?: string;
    currentSymptomsSummary?: string;
    assistiveDiagnosis?: string;
    reportsList?: any;
    doctorsList?: any;
}

export const PatientData: PatientSchema[] = [
    {
        id: "p1",
        sex: "Male",
        age: "25",
        img: "/images/marij1.png",
        currentCondition: "Hypertension",
        bloodGroup: "O+",
        medicalHistorySummary: "Diabetes, High Cholesterol",
        currentSymptomsSummary: "Persistent headaches, Fatigue",
        assistiveDiagnosis: "Hypertension",
        reportsList: [],
        doctorsList: ["d1", "d2"],
    },
    {
        id: "p2",
        sex: "Female",
        age: "30",
        img: "/images/marij2.png",
        currentCondition: "Diabetes",
        bloodGroup: "AB+",
        medicalHistorySummary: "High Cholesterol, Obesity",
        currentSymptomsSummary: "Persistent fatigue, Diarrhea",
        assistiveDiagnosis: "Diabetes",
        reportsList: [],
        doctorsList: ["d3", "d4"],
    },
    {
        id: "p3",
        sex: "Male",
        age: "45",
        img: "/images/marij3.png",
        currentCondition: "Asthma",
        bloodGroup: "A+",
        medicalHistorySummary: "Allergies, Asthma",
        currentSymptomsSummary: "Persistent cough, Shortness of breath",
        assistiveDiagnosis: "Asthma",
        reportsList: [],
        doctorsList: ["d1", "d3"],
    },
    {
        id: "p4",
        sex: "Female",
        age: "50",
        img: "/images/marij4.png",
        currentCondition: "Osteoporosis",
        bloodGroup: "B+",
        medicalHistorySummary: "Bone health issues, High BMI",
        currentSymptomsSummary: "Persistent pain, Fatigue",
        assistiveDiagnosis: "Osteoporosis",
        reportsList: [],
        doctorsList: ["d2", "d4"],
    }
]