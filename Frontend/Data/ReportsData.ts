export interface ReportsSchema {
    id?: string;
    previewImgLink?: string;
    reportName?: string;
    reportDate?: string;
    location?: string;
    reportPDFLink: string;
}

export const ReportsData: ReportsSchema[] = [
    {
        id: "r1",
        previewImgLink: "/images/rep1.png",
        reportName: "Patient 1 Report",
        reportDate: "2022-01-01",
        location: "Hospital 1",
        reportPDFLink: "https://example.com/reports/patient1_report.pdf",
    },
    {
        id: "r2",
        previewImgLink: "/images/rep1.png",
        reportName: "Patient 2 Report",
        reportDate: "2022-02-01",
        location: "Hospital 2",
        reportPDFLink: "https://example.com/reports/patient2_report.pdf",
    },
    {
        id: "r3",
        previewImgLink: "/images/rep1.png",
        reportName: "Patient 3 Report",
        reportDate: "2022-03-01",
        location: "Hospital 3",
        reportPDFLink: "https://example.com/reports/patient3_report.pdf",
    },
    {
        id: "r4",
        previewImgLink: "/images/rep1.png",
        reportName: "Patient 4 Report",
        reportDate: "2022-04-01",
        location: "Hospital 4",
        reportPDFLink: "https://example.com/reports/patient4_report.pdf"
    }
]