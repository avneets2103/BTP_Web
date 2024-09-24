import { cn } from "@/lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import MedicalReport from "./MedicalReport";

export const DocViewLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl gap-4 md:auto-rows-[18rem] md:grid-cols-6",
        className,
      )}
      // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}
    >
      {children}
    </div>
  );
};

export const DocViewLayoutItem = ({
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
}: {
  id: string;
  name?: string;
  sex?: string;
  age?: string;
  img?: string;
  currentCondition?: string;
  bloodGroup?: string;
  medicalHistorySummary?: string;
  currentSymptomsSummary?: string;
  assistiveDiagnosis?: string;
  reportsList?: any;
  doctorsList?: any;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex cursor-pointer flex-col justify-between space-y-4 overflow-clip rounded-xl border border-transparent bg-white p-0 shadow-input",
      )}
      onClick={onOpen}
    >
      <div className="z-10 mt-0 pl-4 pt-4 font-medium text-white">{name}</div>
      <div className="relative -top-6 w-[30rem]">
        <img
          src={img}
          alt=""
          className="-z-10 -ml-3 -mt-16 h-[19rem] md:w-[rem]"
        />
        <div className="z-10 -mt-20 pl-4 font-sans font-medium text-white dark:text-neutral-200">
          {sex}
        </div>
        <div className="z-10 pl-4 font-sans text-xs font-normal text-white dark:text-neutral-300">
          {age}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        size="full"
        onOpenChange={onOpenChange}
        className="h-[95vh] w-[95vw]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="">
                <MedicalReport img={img} id={id} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
