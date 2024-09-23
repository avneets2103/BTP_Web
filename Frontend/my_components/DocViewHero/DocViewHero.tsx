import { PatientSchema } from "@/Interfaces";
import { DocViewLayout, DocViewLayoutItem } from "@/my_components/DocViewHero/DocViewLayout";
import { ReportLayout, ReportLayoutItem } from "@/my_components/ReportLayout";
;
import React from "react";

interface Props {
  data: PatientSchema[];
  searchPat: string;
}

function DocViewHero({ data, searchPat }: Props) {
  const filteredData = data.filter((doc: PatientSchema) => {
    const lowerCaseSearchDoc = searchPat.toLowerCase();
    return (
      doc.name.toLowerCase().includes(lowerCaseSearchDoc) ||
      doc.sex.toLowerCase().includes(lowerCaseSearchDoc) ||
      doc.age.toLowerCase().includes(lowerCaseSearchDoc) ||
      doc.currentCondition?.toLowerCase().includes(lowerCaseSearchDoc) ||
      doc.bloodGroup.toLowerCase().includes(lowerCaseSearchDoc)
    );
  });
  
  return (
    <DocViewLayout className="w-full">
      {filteredData.map(
        ({
          id,
          name,
          sex,
          age,
          img,
          currentCondition,
          bloodGroup,
          medicalHistorySummary,
          currentSymptomsSummary,
          assistiveDiagnosis,
          reportsList,
          doctorsList,
        }) => (
          <DocViewLayoutItem
            key={id}
            id={id}
            name={name}
            sex={sex}
            age={age}
            img={img}
            currentCondition={currentCondition}
            bloodGroup={bloodGroup}
            medicalHistorySummary={medicalHistorySummary}
            currentSymptomsSummary={currentSymptomsSummary}
            assistiveDiagnosis={assistiveDiagnosis}
            reportsList={reportsList}
            doctorsList={doctorsList}
          />
        )
      )}
    </DocViewLayout>
  );
}

export default DocViewHero;
