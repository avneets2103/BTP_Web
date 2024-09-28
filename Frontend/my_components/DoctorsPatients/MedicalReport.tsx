import { Button, ButtonGroup } from "@nextui-org/react";
import { icons } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ReportsData } from "@/Data/ReportsData";
import MyPatientReportHero from "./myPatientsReports";
import DiagnosisAI from "./diagnosisAI";
import { getPatientMedical, removePatient } from "@/Helpers/apiCalls";
import { PatientDataSchema, PatientSchema } from "@/Interfaces";
import Image from "next/image";
import { VitalsLayout, VitalsLayoutItem } from "../healthVitals/VitalsLayout";
import { HealthGraphs } from "@/Data/HealthGraphs";
import { DoctorVitalsLayout, DoctorVitalsLayoutItem } from "./DoctorVitalsLayout";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
interface Props {
  name: string;
  img: string | any;
  id: string;
  setPatList: React.Dispatch<React.SetStateAction<Array<PatientSchema>>>;
  onClose: Function;
}

const MedicalReport = ({ name, img, id, setPatList, onClose }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { theme, setTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("Summarization");
  const placeholders = [
    "Prompt what you want to make?",
    "Patient's Insulin dosage since the past 5 years?",
    "Patient's protein levels in the past 3 months?",
    "Patient's Blood pressure in the past 10 reports?",
  ];
  const patientTabs = [
    {
      name: "Reports",
      iconL: "/icons/reportL.png",
      iconD: "/icons/reportD.png",
    },
    {
      name: "Summarization",
      iconL: "/icons/summaryL.png",
      iconD: "/icons/summaryD.png",
    },
    {
      name: "Graphical Reports",
      iconL: "/icons/graphL.png",
      iconD: "/icons/graphD.png",
    },
    {
      name: "Diagnosis",
      iconL: "/icons/diagnosisL.png",
      iconD: "/icons/diagnosisD.png",
    }
  ]
  const [patientData, setPatientData] = useState<PatientDataSchema>({
    sex: "",
    age: "",
    bloodGroup: "",
    condition: "",
    currentSymptoms: "",
    medicalHistory: "",
    reportsList: [],
  });
  useEffect(() => {
    getPatientMedical(id, setPatientData);
  }, [])

  const renderContent = () => {
    switch (selectedTab) {
      case "Reports":
        return (
          <MyPatientReportHero data={patientData.reportsList}/>
        );
      case "Summarization":
        return (
          <div className="h-full w-full flex flex-col gap-4">
            <div>
              <h2 className="text-[20px] font-bold text-textColorDark">Medical History</h2>
              <p>
                {patientData.medicalHistory}
              </p>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-textColorDark">Current Symptoms</h2>
              <p>
                {patientData.currentSymptoms}
              </p>
            </div>
          </div>
        )
      case "Graphical Reports":
        return (
          <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e)=>setPrompt(e.target.value)}
              onSubmit={()=> console.log(prompt)}
            />
          </div>
          <DoctorVitalsLayout className="w-full max-h-[65vh] overflow-y-scroll">
            {HealthGraphs.map(
              ({
                id, name, data, description,
              }) => (
                <DoctorVitalsLayoutItem
                  key={id}
                  id={id}
                  name={name}
                  data={data}
                  description={description}
                />
              ),
            )}
          </DoctorVitalsLayout>
          </div>
        );
      case "Diagnosis":
        return (
          <DiagnosisAI/>
        )
      default:
        return null;
    }
  };

  return (
    <div className="rounded-[20px] bg-backgroundColor flex text-textColorDark w-full h-full">
      <div className="w-[15%] items-center flex flex-col p-2 border-r-2 border-bgColor justify-between">
        <div>
          <div className="pl-2 font-medium text-medium border-2 border-bgColor flex items-center justify-center rounded-lg h-10">
            {selectedTab}
          </div>
          <div className="flex justify-center">
            <Image
              width={100}
              height={100}
              src={img}
              alt="Patient"
              className="w-[90%] rounded-[20px] shadow-ourBoxShadow mt-2"
            />
          </div>
          <div className="mt-[10px] items-start text-[14px] flex w-[90%] flex-col pl-2">
            <p className="font-semibold text-large">
              {name}
            </p>
            <p>
              <span className="font-medium">Sex</span>: {patientData.sex}
            </p>
            <p>
              <span className="font-medium">Age</span>: {patientData.age}
            </p>
            <p>
              <span className="font-medium">Condition</span>: {patientData.condition}
            </p>
            <p>
              <span className="font-medium">Blood Group</span>: {patientData.bloodGroup}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <Button className="w-full" onPress={
            ()=>{
              removePatient(id, setPatList);
              onClose();
            }
          }>Remove Patient</Button>
        </div>
      </div>
      <div className="w-[85%] flex flex-col">
        <div className="w-full flex flex-col items-center">
          <div className="flex gap-2 bg-bgColor w-[200px] flex justify-center p-2 rounded-[20px]">
            {patientTabs.map((tab) => (
              <Button
                isIconOnly
                className={`${selectedTab === tab.name ? "bg-primaryColor" : ""}`}
                onClick={() => setSelectedTab(tab.name)}
              >
                {theme === "dark" ? 
                <Image width={100} height={100} src={tab.iconD} alt="icon" className="w-[20px]" />:
                <Image width={100} height={100} src={tab.iconL} alt="icon" className="w-[20px]" />}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full p-4 h-full max-h-[80vh] overflow-y-scroll">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MedicalReport;