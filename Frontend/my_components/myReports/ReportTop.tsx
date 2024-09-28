import React, { useState, useRef } from "react";
import SectionDisplay from "../sectionDisplay/sectionDisplay";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import axios from "@/utils/axios";
import { BACKEND_URI,  } from "@/CONSTANTS";
import { ToastErrors, ToastInfo } from "@/Helpers/toastError";
import { CircularProgress } from "@nextui-org/react";
import { FileUploadLimited } from "@/components/ui/file-upload-limited";
import { getReportsList } from "@/Helpers/apiCalls";
import { ReportsSchema } from "@/Interfaces";

interface Props{
  reportSearch: string,
  setReportSearch: React.Dispatch<React.SetStateAction<string>>,
  setReportsList: React.Dispatch<React.SetStateAction<ReportsSchema[]>>,
}

function ReportTop(props: Props) {
  const { reportSearch, setReportSearch, setReportsList } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [reportPDFLink, setReportPDFLink] = useState("");
  const [what, setWhat] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [putURL, setPutURL] = useState<string>("");

  const handleFileUpload = async (files: File[]) => {
    try {
      console.log(files[0].name.split('.')[0]);
      const res = await axios.post(
        `${BACKEND_URI}/patient/reportAddSignedURL`,
        {
          reportName: files[0].name.split('.')[0]
        }
      )
      setPutURL(res.data.data.url);
      setReportPDFLink(res.data.data.reportPDFLink);
      setFiles(files);
    } catch (error) {
      ToastErrors("Re-upload file");
      throw error;
    }
  }

  const handleSubmit = async (onClose: () => void) => {
    if(!what || !where || !when){
      ToastErrors("Please fill all fields");
      return;
    }
    try {
        const formData = new FormData();
        formData.append("file", files[0]);
        if(files[0].type !== "application/pdf"){
          ToastErrors("Please upload a pdf file only!");
          return;
        }
        // Use fetch instead of Axios for uploading to the signed URL
        const response = await fetch(putURL, {
          method: "PUT",
          body: files[0], // directly pass the file, not formData
          headers: {
            "Content-Type": files[0].type, // Ensure the file content type is correct
          },
        });

        if (!response.ok) {
          throw new Error("Report upload failed!");
        }

        const res = await axios.post(
          `${BACKEND_URI}/patient/addReport`,
          {
            reportName: what,
            location: where,
            reportDate: when,
            reportPDFLink: reportPDFLink,
          }
        )

        getReportsList(setReportsList);
        setWhat("");
        setWhere("");
        setWhen("");
        setFiles([]);
        setPutURL("");
        onClose();
        ToastInfo("Report uploaded successfully");
    } catch (error) {
      ToastErrors("Report upload failed! Try again");
      throw error;
    }
  }

  return (
    <div className="width-[100%] my-4 flex h-[7%] cursor-pointer items-center justify-between font-medium">
      <div className="flex gap-4">
        <SectionDisplay />
      </div>
      <div className="flex h-[7vh] items-end gap-2">
        <Input
          radius="sm"
          placeholder="Search Reports"
          startContent={
            <div>
              <img src="../icons/search.png" className="w-[15px]" alt="logo" />
            </div>
          }
          value={reportSearch}
          onChange={(e) => setReportSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondaryColor"
            onClick={() => {
              onOpen();
            }}
          >
            <img src="../icons/additionH.png" className="w-[15px]" alt="logo" />
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1 font-medium">
                  {"Add Report"}
                </ModalHeader>
                <ModalBody className="max-h-[60vh] overflow-y-scroll">
                  {(loading && (
                    <div className="flex h-full w-full items-center justify-center">
                      <CircularProgress aria-label="Loading..." color="danger" />
                    </div>
                  )) || (
                  <div className="flex flex-col gap-5">
                    <FileUploadLimited onChange={handleFileUpload} maxFileCount={1}/>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-textColorLight px-2">Enter Report Details: </p>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-textColorLight px-2 h-10 rounded-xl items-center text-center flex border-1">What? </p>
                        <Input
                        variant="underlined"
                        radius="sm"
                        placeholder="Enter Name of Report"
                        value={what}
                        onChange={(e) => setWhat(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-textColorLight px-2 h-10 rounded-xl items-center text-center flex border-1">When? </p>
                        <Input
                        variant="underlined"
                        radius="sm"
                        placeholder="Enter Date of Report"
                        value={when}
                        onChange={(e) => setWhen(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-textColorLight px-2 h-10 rounded-xl items-center text-center flex border-1">Where? </p>
                        <Input
                        variant="underlined"
                        radius="sm"
                        placeholder="Enter Location of Report Creation"
                        value={where}
                        onChange={(e) => setWhere(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </ModalBody>
                <ModalFooter>
                    <>
                      <Button
                        className="mx-auto bg-primaryColor text-white"
                        variant="flat"
                        onPress={async () => {
                          try {
                            setLoading(true);
                            handleSubmit(onClose);
                          } catch (e) {
                            ToastErrors("Add Report Failed");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Add Report
                      </Button>
                    </>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default ReportTop;
