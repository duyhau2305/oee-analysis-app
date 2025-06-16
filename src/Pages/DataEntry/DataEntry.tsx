import { useState } from "react";

import AreaSetting from "../../Component/DataEntry/AreaSetting";
import DeviceSetting from "../../Component/DataEntry/DeviceSetting";
import ErrorReportCatalog from "../../Component/DataEntry/ErrorReportCatalog";
import EmployeeCatalog from '../../Component/DataEntry/EmployeeCatalog';

const tabs: string[] = [
   "Khu vực",
  "Thiết bị",
  "Nguyên nhân dừng máy",
  "Ca làm việc ",
  "Nhân viên",
];

const tabComponents: Record<string, React.ReactNode> = {
    "Khu vực": <AreaSetting />,
    "Thiết bị": <DeviceSetting />,
    "Nguyên nhân dừng máy": <ErrorReportCatalog />,
    "Ca làm việc": <span className="text-gray-700 dark:text-gray-300">aaa</span>,
    "Nhân viên": <EmployeeCatalog />
  };
  

export default function DataEntry() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-400 font-bold text-xl text-gray-400 font-[Open_Sans] dark:border-gray-600 dark:bg-[#0D2743]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-md cursor-pointer font-medium border-b-2 transition-colors duration-300 ${
              activeTab === tab
                ? "border-blue-500 border-b-4 drop-shadow-lg dark:text-white"
                : "border-transparent text-gray-300 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 h-screen">
        <div className="col-span-7 border-l dark:bg-[#0D2743] dark:border-gray-400 p-2">
          <div className="text-gray-700 dark:text-gray-300">
            {tabComponents[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
}
