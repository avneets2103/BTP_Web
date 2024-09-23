import { ReportsSchema } from "@/Interfaces";
import { ReportLayout, ReportLayoutItem } from "@/my_components/ReportLayout";
import React from "react";

interface Props {
  data: ReportsSchema[];
}

function ReportHero({ data }: Props) {
  return (
    <ReportLayout className="w-full">
      {data.map(
        ({
          id,
          previewImgLink,
          reportName,
          reportDate,
          location,
          reportPDFLink,
        }) => (
          <ReportLayoutItem
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
    </ReportLayout>
  );
}

export default ReportHero;
