import { Button, ButtonGroup } from "@nextui-org/react";
import { icons } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { ReportsData } from "@/Data/ReportsData";
import MyPatientReportHero from "./myPatientsReports";
import DiagnosisAI from "./diagnosisAI";
import { removePatient } from "@/Helpers/apiCalls";
import { PatientSchema } from "@/Interfaces";
interface Props {
  img: string | any;
  id: string;
  setPatList: React.Dispatch<React.SetStateAction<Array<PatientSchema>>>;
  onClose: Function;
}

const MedicalReport = ({ img, id, setPatList, onClose }: Props) => {
  const { theme, setTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("Diagnosis");
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
  // TODO: Get data from backend based on the patient id

  const renderContent = () => {
    switch (selectedTab) {
      case "Reports":
        return (
          <MyPatientReportHero reportSearch={""} data={ReportsData}/>
        );
      case "Summarization":
        return (
          <div className="h-full w-full flex flex-col gap-4">
            <div>
              <h2 className="text-[20px] font-bold text-textColorDark">Medical History</h2>
              <p>
                22-year-old female, has no known allergies and does not take any medications. She has no reported medical conditions or surgical history. She is up-to-date on all recommended vaccinations, including MMR, DTaP, HPV, and annual flu shots. Her family medical history is unremarkable, with no known significant medical conditions. She denies tobacco use, illicit substance use, and only drinks alcohol occasionally. She exercises regularly, 3-4 times per week. Her menstrual history is normal, with menarche at age 12, regular 28-day cycles, and 5-day flow. She has no current complaints or concerns, and her last physical exam and Pap smear were within the past year and 3 years, respectively.
              </p>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-textColorDark">Current Symptoms</h2>
              <p>
                Presents with a palpable lump in her right breast, accompanied by nipple discharge and pain in the affected breast. Additionally, she reports swelling and redness in the right breast. These symptoms have been persistent and have prompted her to seek medical attention.
              </p>
            </div>
          </div>
        )
      case "Graphical Reports":
        return (
          <>
            <div className="flex w-full flex-row gap-4">
                <div className="flex w-[35%] flex-col gap-4">
                  <img src="/images/BMI.png" alt="" className="w-[100%]" />
                  <img src="/images/Glucose.png" alt="" className="w-[100%]" />
                </div>
                <div className="flex w-[20.3%] flex-col">
                  <img src="/images/Fat.png" alt="" className="w-full" />
                </div>
                <div className="flex w-[20%] flex-col gap-4">
                  <img src="/images/Schedule.png" alt="" className="w-full" />
                </div>
                <div className="flex w-[20%] flex-col gap-4">
                  <img src="/images/Circle.png" alt="" className="w-full" />
                </div>
                <div className="flex w-[35%] flex-col gap-4">
                  <img src="/images/BMI.png" alt="" className="w-[100%]" />
                  <img src="/images/Glucose.png" alt="" className="w-[100%]" />
                </div>
                <div className="flex w-[20.3%] flex-col">
                  <img src="/images/Fat.png" alt="" className="w-full" />
                </div>
                <div className="flex w-[20%] flex-col gap-4">
                  <img src="/images/Schedule.png" alt="" className="w-full" />
                </div>
                <div className="flex w-[20%] flex-col gap-4">
                  <img src="/images/Circle.png" alt="" className="w-full" />
                </div>
            </div>
          </>
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
            <img
              src={img}
              alt="Patient"
              className="w-[90%] rounded-[20px] shadow-ourBoxShadow mt-2"
            />
          </div>
          <div className="mt-[10px] items-start text-[14px] flex w-[90%] flex-col pl-2">
            <p className="font-semibold text-large">
              Janie Doe
            </p>
            <p>
              <span className="font-medium">Sex</span>: Female
            </p>
            <p>
              <span className="font-medium">Age</span>: 22
            </p>
            <p>
              <span className="font-medium">Condition</span>: Lupus
            </p>
            <p>
              <span className="font-medium">Blood Group</span>: O-
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
                <img src={tab.iconD} alt="icon" className="w-[20px]" />: 
                <img src={tab.iconL} alt="icon" className="w-[20px]" />}
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