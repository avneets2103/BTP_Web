import { ReportsSchema } from "@/Interfaces";
import { ReportLayout, ReportLayoutItem } from "@/my_components/myReports/ReportLayout";
import React from "react";
import { MyPatientReportLayout, MyPatientReportLayoutItem } from "./myPatientsReportsLayout";

interface Props {
  data: ReportsSchema[];
  reportSearch: string;
}

function MyPatientReportHero(props: Props) {
  const {reportSearch, data} = props;
  const filteredData = data.filter((doc: ReportsSchema) => {
    const lowerCaseSearchDoc = reportSearch.toLowerCase();
    return (
      doc.reportName.toLowerCase().includes(lowerCaseSearchDoc) ||
      doc.location.toLowerCase().includes(lowerCaseSearchDoc)
    );
  });
  return (
    <MyPatientReportLayout className="w-full">
      {filteredData.map(
        ({
          id,
          previewImgLink,
          reportName,
          reportDate,
          location,
          reportPDFLink,
        }) => (
          <MyPatientReportLayoutItem
            key={id}
            id={id}
            previewImgLink={previewImgLink}
            reportName={reportName}
            reportDate={reportDate}
            location={location}
            reportPDFLink={reportPDFLink}
          />
        ),
      )}
    </MyPatientReportLayout>
  );
}

export default MyPatientReportHero;
