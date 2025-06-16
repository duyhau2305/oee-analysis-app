import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import moment from 'moment-timezone';

// Type definitions for the `machine` prop and associated data
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

// Function to get the header color based on machine status
const getHeaderColor = (status: string) => {
  if (status === 'Run') return '#60ec60';  // Green for Active
  if (status === 'Idle' || status === 'Cài Đặt') return '#f8f867';   // Yellow for Idle or Set up
  if (status === 'Stop') return '#ff3333';  // Red for Error
  if (status === 'Off') return '#f7f5f5';   // Grey for Off
  return 'bg-gray-500';                     // Gray for other statuses
};

// Function to get the signal light colors based on machine status
const getSignalLightColors = (status: string) => {
  if (status === 'Chạy') return { red: 'white', yellow: 'white', green: '#13a113' };
  if (status === 'Chờ' || status === 'Cài Đặt') return { red: 'white', yellow: '#f4f41e', green: 'white' };
  if (status === 'Dừng') return { red: '#e60000', yellow: 'white', green: 'white' };
  if (status === 'Off') return { red: 'white', yellow: 'white', green: 'white' };
  return { red: 'white', yellow: 'white', green: 'white' }; // Default case
};

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const headerColor = getHeaderColor(machine.currentStatus || '');
  const signalLightColors = getSignalLightColors(machine.productionTasks?.[0]?.shifts?.[0]?.status || '');
  const blinkClass = machine?.status === 'Dừng' ? 'animate-blinkError' : '';

  // Function to format minutes into time (HH:mm format)
  function formatMinutesToTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes.toString().padStart(2, '0')}`;
  }

  // Function to calculate the duration of machine operation in HH:mm:ss format
  const calculateDurationInHoursAndMinutes = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return '';
  
    // Convert the start and end times to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    // Convert the Date objects to timestamps (in milliseconds) and subtract them
    const durationInMilliseconds = end.getTime() - start.getTime();
  
    // Convert the duration from milliseconds to seconds
    const durationInSeconds = durationInMilliseconds / 1000;
  
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  

  // Percent difference calculations for displaying progress
  const percentDiff = machine?.percentDiff || '0%';
  const numericPercentDiff = parseFloat(percentDiff);
  const isIncrease = numericPercentDiff > 0;
  const isDecrease = numericPercentDiff < 0;
  const displayPercentDiff = Math.abs(numericPercentDiff).toFixed(2) + '%';
  const arrowColor = headerColor === '#ff3333' ? 'text-white' : (isIncrease ? 'text-green-700' : 'text-red-500');

  // Function to calculate shift duration with a fixed start time (e.g., 08:00)
  const calculateShiftDurationWithFixedStart = (machine: Machine) => {
    const endTime = machine.productionTasks?.[0]?.shifts[0]?.shiftDetails?.endTime || null;

    if (!endTime) {
      return 8 * 60 * 60; // Default to 8 hours if no end time is available
    }

    const normalizeTime = (time: string) => {
      const [hour, minute] = time.split(':');
      return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    };

    const today = moment().format('YYYY-MM-DD');
    const fixedStartTime = '08:00'; // Fixed start time (e.g., 08:00 AM)
    const normalizedEndTime = normalizeTime(endTime);

    const start = moment.tz(`${today}T${fixedStartTime}`, 'Asia/Ho_Chi_Minh').valueOf();
    const end = moment.tz(`${today}T${normalizedEndTime}`, 'Asia/Ho_Chi_Minh').valueOf();

    return (end - start) / 1000; // Duration in seconds
  };

  const durationInSeconds = calculateShiftDurationWithFixedStart(machine);

  return (
    <div className={`shadow-md flex flex-col justify-between`} style={{ backgroundColor: headerColor }}>
      {/* 1. Header */}
      <div className="flex flex-col items-center justify-center" style={{ backgroundColor: headerColor }}>
        <div className="text-[#122a35] bg-black-rgba w-full flex justify-center ">
          <h2 className="text-[29px] font-bold text-[#375BA9]">{machine.deviceId || ''}</h2>
        </div>
        {/* Machine Time and Status */}
        <div className="text-center mt-0.5">
          <span className="text-2xl font-bold">
            {machine.currentStatus || ''} - {calculateDurationInHoursAndMinutes(machine.timelineStartTime, machine.timelineEndTime)}
          </span>
        </div>
      </div>

      {/* 2. OEE Section */}
      <div className="flex items-center ml-2 justify-center bg-transparent p-3 mb-5">
        {/* Signal Light */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-12 h-28 border border-black rounded-lg mr-4 -ml-3">
            <div style={{ backgroundColor: signalLightColors.red, height: '33.33%' }} className={`rounded-t-lg ${blinkClass} border-l-red-600 border-l-4 rounded-t-lg border-b-2 border-b-red-600`}></div>
            <div style={{ backgroundColor: signalLightColors.yellow, height: '33.33%' }} className="border-[#FCFC00] border-l-4 border-b-2"></div>
            <div style={{ backgroundColor: signalLightColors.green, height: '33.33%' }} className="border-[#13a113] border-l-4 rounded-b-lg"></div>
          </div>
        </div>

        {/* OEE Circular Progress */}
        <div className="relative ml-2" style={{ width: 160, height: 160 }}>
          <CircularProgressbar
            value={(machine.summaryStatus / durationInSeconds) * 100}
            styles={buildStyles({
              pathColor: '#0782f4',
              textColor: '#122a35',
            //   fontSize: 'bold',
              trailColor: '#dbdbd7',
            })}
          />

          {/* OEE Value */}
          <div className="absolute mb-1 -top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
            <span className="text-4xl font-bold mt-6">
              {formatMinutesToTime(machine.summaryStatus - machine.totalTimeRun || 0)}p
            </span>
            <span className="text-2xl font-bold " style={{ color: headerColor === '#ff3333' ? '#ffffff' : '#ff3333' }}>
              {formatMinutesToTime(machine.summaryStatusIdle + machine.summaryStatusStop - machine.totalTimeIdle - machine.totalTimeStop - (machine.totalBreakTimeInMinutes * 60) || 0)}p
            </span>
            <span className="font-bold flex items-center mt-1">
              {isIncrease && <FaArrowUp className={`${arrowColor} mr-1 text-xl`} />}
              {isDecrease && <FaArrowDown className={`${arrowColor} mr-1 text-xl`} />}
              <span className={`${arrowColor} text-md`}>{displayPercentDiff}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Time Labels Section */}
      <div className="flex justify-between bg-white text-black px-2">
        <span className="text-md font-bold">
          {machine.timeRange ? (
            machine.timeRange
          ) : (
            <>
              {machine.productionTasks?.[0]?.shifts[0]?.shiftDetails?.startTime || ''} - {machine.productionTasks?.[0]?.shifts[0]?.shiftDetails?.endTime || ''}
            </>
          )}
        </span>
        <span className="text-md font-bold">Tỷ lệ chạy: {`${(machine.machinePercent || 0).toFixed(2)}%`}</span>
      </div>
    </div>
  );
};

export default MachineCard;
