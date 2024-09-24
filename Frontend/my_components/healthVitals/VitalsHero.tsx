import { GraphSchema, ReportsSchema } from "@/Interfaces";
import { ReportLayout, ReportLayoutItem } from "@/my_components/myReports/ReportLayout";

import React from "react";

interface Props {
  data: GraphSchema[];
  searchVitals: string;
}

function VitalsHero({ data, searchVitals }: Props) {
  // TODO: Based on the data, make the graphs using a library like Chart.js
  // TODO: Based on searchVitals, filter the data and display the relevant graphs
  return (
    <>
    </>
  );
}

export default VitalsHero;
