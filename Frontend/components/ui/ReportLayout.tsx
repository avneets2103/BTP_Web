import { cn } from "@/lib/utils";
import ChatInterface from "@/my_components/chat-interface/ChatInterface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


export const ReportLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl gap-4 md:auto-rows-[18rem] md:grid-cols-4",
        className,
      )}
      // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}
    >
      {children}
    </div>
  );
};


export const ReportLayoutItem = ({
  id,
  previewImgLink,
  reportName,
  reportDate,
  location,
  reportPDFLink,
}: {
  id?: string;
  previewImgLink?: string;
  reportName?: string;
  reportDate?: string;
  location?: string;
  reportPDFLink?: string;
}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
return (
    <div
        className={cn(
            "group/bento row-span-1 flex cursor-pointer flex-col justify-between space-y-4 overflow-clip rounded-xl border border-transparent bg-[--fixed-bg-color] p-0 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        )}
        onClick={() => window.open(reportPDFLink, '_blank')}
    >
        <div className="z-10 mt-0 pl-4 pt-4 font-bold text-[--fixed-bg-color]">
            {reportName}
        </div>
        <div className="relative -top-5 w-[30rem] transition duration-200 group-hover/bento:translate-x-2">
            <img
                src={previewImgLink}
                alt=""
                className="-z-10 -ml-3 -mt-16 h-[19rem] md:w-[rem]"
            />
            <div className="z-10 -mt-20 pl-4 font-sans font-bold text-[--fixed-bg-color] dark:text-neutral-200">
                {reportDate}
            </div>
            <div className="z-10 pl-4 font-sans text-xs font-bold text-[--fixed-bg-color] dark:text-neutral-300 ">
                {location}
            </div>
        </div>
    </div>
);
};
