import { ReportLayout, ReportLayoutItem } from "@/my_components/ReportLayout";

import React from "react";
import HealthChat from "../healthchat-ai/HealthChat";
import { ReportsSchema } from "@/Interfaces";

interface Props {
  data?: ReportsSchema[];
}

// id?: string;
//     previewImgLink?: string;
//     reportName?: string;
//     reportDate?: string;
//     location?: string;
//     reportPDFLink: string;

function SupportHero({ data }: Props) {
  return (
    <>
        <HealthChat/>
    </>
  );
}

export default SupportHero;
