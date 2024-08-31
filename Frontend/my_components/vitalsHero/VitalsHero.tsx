import { ReportLayout, ReportLayoutItem } from "@/components/ui/ReportLayout";
import { ReportsSchema } from "@/Data/ReportsData";
import React from "react";

interface Props {
  data?: ReportsSchema[];
}

// id?: string;
//     previewImgLink?: string;
//     reportName?: string;
//     reportDate?: string;
//     location?: string;
//     reportPDFLink: string;

function VitalsHero({ data }: Props) {
  return (
    <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-4">
            <img src="/images/BMI.png" alt="" className="w-[34rem] h-auto"/>
            <img src="/images/Glucose.png" alt="" className="w-[34rem] h-auto" />
        </div>
        <div>
            <img src="/images/Fat.png" alt="" className="w-[19.5rem] h-auto"/>
        </div>
        <div className="flex flex-col gap-4">
            <img src="/images/Schedule.png" alt="" className="w-[16rem] h-auto" />
            <img src="/images/Circle.png" alt="" className="w-[16rem] h-auto" />
        </div>
    </div>
  );
}

export default VitalsHero;
