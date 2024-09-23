interface sidebarRTK { 
    currentPage: string,
    currentList: string,
};

interface sidebarMenuItems {
    name: string,
    path: string,
    iconS: string,
    iconNS: string,
    patient: Boolean,
}

interface DocSchema{
    id: string;
    name: string;
    speciality:string;
    qualifications: string;
    imageLink: string;
    experience: string;
    patientsList?: Array<string>;  
}

interface PatientSchema{
    id: string;
    name: string;
    sex: string;
    age: string;
    img: string;
    currentCondition?: string;
    bloodGroup: string;
    medicalHistorySummary?: string;
    currentSymptomsSummary?: string;
    assistiveDiagnosis?: string;
    reportsList?: any;
    doctorsList?: any;
}

interface ReportsSchema {
    id?: string;
    previewImgLink?: string;
    reportName?: string;
    reportDate?: string;
    location?: string;
    reportPDFLink?: string;
}

export type {
    sidebarRTK,
    sidebarMenuItems, 
    DocSchema,
    PatientSchema,
    ReportsSchema,
}