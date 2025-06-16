import React from 'react';
import MachineCard from './MachineCard';

// Define types for props
interface ShiftDetail {
    startTime: string;
    endTime: string;
  }
  
  interface Shift {
    status: string;
    employeeName: string[];
    shiftDetails: ShiftDetail;
  }
interface ProductionTask {
    shifts: Shift[];
  }
interface Machine {
  id: string;
  deviceId: string;
  currentStatus: string;
  timelineStartTime: string;
  timelineEndTime: string;
  productionTasks: ProductionTask[];
  summaryStatus: number;
  totalTimeRun: number;
  summaryStatusIdle: number;
  summaryStatusStop: number;
  totalTimeIdle: number;
  totalTimeStop: number;
  totalBreakTimeInMinutes: number;
  machinePercent: number;
  percentDiff: string;
  status: string;
  timeRange: string;
}

interface DashboardGridProps {
  machines: Machine[];
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ machines }) => {
  return (
    <div
      className="grid lg:grid-cols-6 gap-0.5 h-screen sm:grid-cols-3"
      style={{ maxHeight: '100vh' }}
    >
      {machines.map((machine) => (
        <div key={machine.id} className="flex flex-col gap-2 flex flex-col h-full">
       
          <MachineCard machine={machine} />
        </div>
      ))}
    </div>
  );
};

export default DashboardGrid;
