import { cn } from "@/lib/utils";

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
        "grid md:auto-rows-[18rem] md:grid-cols-6 gap-4 max-w-7xl mx-auto",
        className
      )}
      // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}
    >
      {children}
    </div>
  );
};


// id?: string;
// name?: string;
// speciality?:string;
// qualifications?: string;
// imageLink?: string;
// experience?: string;
// patientsList?: Array<string>;  


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
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-0 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-clip cursor-pointer",
      )}
    >
      <div className="z-10 mt-0 pt-4 font-bold pl-4 text-[--fixed-bg-color]">
        {name}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative -top-4 w-[30rem]">
        <img src={img} alt="" className="-mt-16 -ml-3 -z-10 md:w-[rem] h-[19rem] " />
        <div className="font-sans -mt-20 pl-4 font-bold text-[--fixed-bg-color] dark:text-neutral-200 z-10">
          {speciality}
        </div>
        <div className="font-sans font-normal pl-4 text-[--fixed-bg-color] text-xs dark:text-neutral-300 z-10">
          {qualification}
        </div>
        <div className="font-sans font-normal pl-4 text-[--fixed-bg-color] text-xs dark:text-neutral-300 z-10">
          {qualification}
        </div>
      </div>
    </div>
  );
};
