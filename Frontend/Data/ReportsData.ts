export interface ReportsSchema {
    id?: string;
    previewImgLink?: string;
    reportName?: string;
    reportDate?: string;
    location?: string;
    reportPDFLink?: string;
}

export const ReportsData: ReportsSchema[] = [
    {
        id: "r1",
        previewImgLink: "/images/rep1.png",
        reportName: "EKG",
        reportDate: "2022-01-03",
        location: "St. Mary's Hospital",
        reportPDFLink: "https://example.com/reports/patient1_report.pdf",
    },
    {
        id: "r2",
        previewImgLink: "/images/rep1.png",
        reportName: "Kidney Profile Test",
        reportDate: "2022-02-01",
        location: "General Hospital",
        reportPDFLink: "https://example.com/reports/patient2_report.pdf",
    },
    {
        id: "r3",
        previewImgLink: "/images/rep1.png",
        reportName: "Liver Function Test",
        reportDate: "2022-03-01",
        location: "City Medical Center",
        reportPDFLink: "https://example.com/reports/patient3_report.pdf",
    },
]