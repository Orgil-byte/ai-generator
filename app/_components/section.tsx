import { Dispatch, SetStateAction } from "react";

type SectionProps = {
  setActiveSection: Dispatch<SetStateAction<string>>;
  activeSection: string;
};

export const Section = ({ setActiveSection, activeSection }: SectionProps) => {
  return (
    <div className="w-fit p-1 rounded-lg bg-[#F4F4F5] flex">
      <p
        onClick={() => setActiveSection("generator")}
        className={`py-1 px-3 rounded-md font-medium text-[14px] ${activeSection === "generator" ? "text-black bg-white" : "text-[#71717A]"} cursor-pointer transition-colors`}
      >
        Image creator
      </p>
      <p
        onClick={() => setActiveSection("analysis")}
        className={`py-1 px-3 rounded-md font-medium text-[14px] ${activeSection === "analysis" ? "text-black bg-white" : "text-[#71717A]"} cursor-pointer transition-colors`}
      >
        Image analysis
      </p>
    </div>
  );
};
