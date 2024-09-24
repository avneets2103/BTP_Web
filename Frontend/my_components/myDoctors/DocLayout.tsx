import { cn } from "@/lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

export const DocLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid md:auto-rows-[18rem] md:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DocLayoutItem = ({
  id,
  name,
  speciality,
  img,
  qualification,
  experience,
  patientsList,
}: {
  id?: string;
  name?: string;
  speciality?: string;
  img?: string;
  qualification?: string;
  experience?: string;
  patientsList?: Array<string> | any;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className={cn(
        "br-black group/bento row-span-1 flex w-[13.4vw] cursor-pointer flex-col justify-between space-y-4 overflow-clip rounded-xl border border-transparent bg-white p-0 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
      )}
      onClick={onOpen}
    >
      <div className="z-10 mt-0 pl-4 pt-4 font-medium text-white">
        {name}
      </div>
      <div className="relative -top-4 w-[20rem]">
        <img
          src={img}
          alt="doctor image"
          className="-z-10 -ml-3 -mt-16 h-[19rem] md:w-[rem]"
        />
        <div className="z-10 -mt-20 pl-4 font-sans font-bold text-white">
          {speciality}
        </div>
        <div className="z-10 pl-4 font-sans text-xs font-normal text-white">
          {qualification}
        </div>
        <div className="z-10 pl-4 font-sans text-xs font-normal text-white">
          {experience}yrs Experience
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center" // where to place the modal
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex items-center gap-2">
                <img src={img} alt="doctor's image" className="h-[40px] w-[40px] rounded-[35px]"/>
                <p>{name}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2">
                  <Button
                    className="mx-auto text-primaryColor"
                    variant="flat"
                    onPress={() => {
                      // handleRemoveDoctor();
                    }}
                  >
                    Remove Doctor
                  </Button>
                  <Button
                    className="mx-auto bg-primaryColor text-white"
                    variant="flat"
                    onPress={() => {
                      // handle calling his hospital
                    }}
                  >
                    Book Appointment
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
