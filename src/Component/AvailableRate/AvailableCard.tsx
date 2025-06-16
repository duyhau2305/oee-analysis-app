import React from "react";
import MachineTimeline from "./MachineTimeline";
import MachinePercent from "./MachinePercent";
import moment from "moment";

interface AvailableCardProps {
  machineName: string;
  deviceId: string;
  selectedDate: moment.Moment;
  machineType: string;
  viewMode: 'compact' | 'normal' | 'percentage';
}

const AvailableCard: React.FC<AvailableCardProps> = ({ 
  machineName, 
  deviceId, 
  selectedDate, 
  machineType, 
  viewMode 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-2 dark:bg-[#0D2743]">
      
      <div className="card-body">
     
        
     
        {viewMode === 'percentage' ? (
          <MachinePercent 
            deviceId={deviceId}
            machineName={machineName}
            selectedDate={selectedDate}
            machineType={machineType} 
          />
        ) : (
          <MachineTimeline 
            deviceId={deviceId}
            machineName={machineName}
            selectedDate={selectedDate}
            machineType={machineType} 
          />
        )}
      </div>
    </div>
  );
};

export default AvailableCard;
