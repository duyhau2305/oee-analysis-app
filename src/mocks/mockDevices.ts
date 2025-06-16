import moment from 'moment';

export interface DeviceData {
  runTime?: number;
  stopTime?: number;
  idleTime?: number;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  data: DeviceData;
}

// Generate random time data that sums up to 86400 seconds (24 hours)
const generateRandomTimeData = (): DeviceData => {
  const totalSeconds = 86400;
  const runTime = Math.floor(Math.random() * (totalSeconds * 0.7)); // Up to 70% runtime
  const stopTime = Math.floor(Math.random() * (totalSeconds * 0.2)); // Up to 20% stop time
  const idleTime = Math.floor(Math.random() * (totalSeconds * 0.1)); // Up to 10% idle time
  
  return {
    runTime,
    stopTime,
    idleTime
  };
};

export const mockDevices: Device[] = [
  {
    id: "DEV001",
    name: "Máy CNC 1",
    type: "CNC",
    data: generateRandomTimeData()
  },
  {
    id: "DEV002",
    name: "Máy CNC 2",
    type: "CNC",
    data: generateRandomTimeData()
  },
  {
    id: "DEV003",
    name: "Máy Tiện 1",
    type: "Lathe",
    data: generateRandomTimeData()
  },
  {
    id: "DEV004",
    name: "Máy Tiện 2",
    type: "Lathe",
    data: generateRandomTimeData()
  },
  {
    id: "DEV005",
    name: "Máy Phay 1",
    type: "Milling",
    data: generateRandomTimeData()
  },
  {
    id: "DEV006",
    name: "Máy Phay 2",
    type: "Milling",
    data: generateRandomTimeData()
  },
  {
    id: "DEV007",
    name: "Máy Mài 1",
    type: "Grinding",
    data: generateRandomTimeData()
  },
  {
    id: "DEV008",
    name: "Máy Mài 2",
    type: "Grinding",
    data: generateRandomTimeData()
  },
  {
    id: "DEV009",
    name: "Máy Khoan 1",
    type: "Drilling",
    data: generateRandomTimeData()
  },
  {
    id: "DEV010",
    name: "Máy Khoan 2",
    type: "Drilling",
    data: generateRandomTimeData()
  }
];

// Generate timeline data for a specific date
export const generateTimelineData = (date: moment.Moment) => {
  return mockDevices.map(device => ({
    deviceId: device.id,
    date: date.format('YYYY-MM-DD'),
    data: device.data
  }));
}; 