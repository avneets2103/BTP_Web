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

interface Props{
  reportSearch: string,
  setReportSearch: React.Dispatch<React.SetStateAction<string>>
}

function ReportTop(props: Props) {
  const { reportSearch, setReportSearch } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [reportLink, setReportLink] = useState("");
  const [what, setWhat] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");

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
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1 font-medium">
                  {"Add Report"}
                </ModalHeader>
                <ModalBody>
                  {(loading && (
                    <div className="flex h-full w-full items-center justify-center">
                      <CircularProgress aria-label="Loading..." color="danger" />
                    </div>
                  )) || (
                  <div className="flex flex-col gap-5">
                    <Input
                      variant="faded"
                      radius="sm"
                      placeholder="Enter Report Link"
                      startContent={
                        <div>
                          <img
                            src="../icons/web.png"
                            className="w-[15px]"
                            alt="logo"
                          />
                        </div>
                      }
                      value={reportLink}
                      onChange={(e) => setReportLink(e.target.value)}
                    />
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
