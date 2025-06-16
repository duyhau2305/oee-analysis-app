import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { mockDevices } from '../../mocks/mockDevices';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MachinePercentProps {
  deviceId: string;
  selectedDate: moment.Moment;
  machineName: string;
  machineType: string;
}

interface DeviceData {
  runTime?: number;
  stopTime?: number;
  idleTime?: number;
}

interface StatusData {
  status: string;
  displayPercent: number;
}

const MachinePercent: React.FC<MachinePercentProps> = ({ deviceId, selectedDate, machineName, machineType }) => {
  const [deviceData, setDeviceData] = useState<DeviceData>({});
  const [loading, setLoading] = useState<boolean>(true);
  // const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const totalSeconds = 86400;

  const calculatePercentages = (data: DeviceData) => {
    const runTimeSeconds = data.runTime || 0;
    const stopTimeSeconds = data.stopTime || 0;
    const idleTimeSeconds = data.idleTime || 0;
    const offlineTimeSeconds = Math.max(0, totalSeconds - (runTimeSeconds + stopTimeSeconds + idleTimeSeconds));

    return {
      Chạy: (runTimeSeconds / totalSeconds) * 100,
      Dừng: (stopTimeSeconds / totalSeconds) * 100,
      Chờ: (idleTimeSeconds / totalSeconds) * 100,
      Offline: (offlineTimeSeconds / totalSeconds) * 100,
    };
  };

  useEffect(() => {
    if (deviceId && selectedDate) {
      fetchTelemetryData(deviceId, selectedDate);
    }
  }, [deviceId, selectedDate]);

  const fetchTelemetryData = async (deviceId: string, selectedDate: moment.Moment) => {
    setLoading(true);
    try {
      // Mock data implementation
      const mockDevice = mockDevices.find(device => device.id === deviceId);
      if (mockDevice) {
        setDeviceData(mockDevice.data);
      } else {
        console.warn(`No mock data found for deviceId ${deviceId}`);
        setDeviceData({});
      }

      // Original API implementation
      /*
      const startTime = selectedDate.clone().startOf('day').toISOString();
      const endTime = selectedDate.clone().endOf('day').toISOString();
      const apiEndpoint = `${apiUrl}/machine-operations/${deviceId}/summary-status?startTime=${startTime}&endTime=${endTime}`;
      const response = await axios.get(apiEndpoint);

      if (response.data?.data?.length > 0) {
        setDeviceData(response.data.data[0]);
      } else {
        console.warn(`No data found for deviceId ${deviceId}`);
        setDeviceData({});
      }
      */
    } catch (error) {
      console.error(`Error fetching telemetry data for deviceId ${deviceId}:`, error);
      setDeviceData({});
    } finally {
      setLoading(false);
    }
  };

  const getChartData = (): ChartData<'bar'> => {
    if (!deviceData) return { labels: [], datasets: [] };

    const percentages = calculatePercentages(deviceData);

    const adjustedData: StatusData[] = Object.entries(percentages).map(([status, percent]) => ({
      status,
      displayPercent: percent < 0 ? 0 : percent,
    }));

    const findStatusData = (status: string): StatusData => {
      const data = adjustedData.find(d => d.status === status);
      if (!data) throw new Error(`Status ${status} not found`);
      return data;
    };

    return {
      labels: ['Machine Status'],
      datasets: [
        {
          label: `Chạy (${findStatusData('Chạy').displayPercent.toFixed(2)}%)`,
          data: [findStatusData('Chạy').displayPercent],
          backgroundColor: '#00C8D7',
        },
        {
          label: `Dừng (${findStatusData('Dừng').displayPercent.toFixed(2)}%)`,
          data: [findStatusData('Dừng').displayPercent],
          backgroundColor: '#f10401',
        },
        {
          label: `Chờ (${findStatusData('Chờ').displayPercent.toFixed(2)}%)`,
          data: [findStatusData('Chờ').displayPercent],
          backgroundColor: '#FFC107',
        },
        {
          label: `Offline (${findStatusData('Offline').displayPercent.toFixed(2)}%)`,
          data: [findStatusData('Offline').displayPercent],
          backgroundColor: '#d3d3d3',
        },
      ],
    };
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // @ts-ignore - datalabels plugin types are not properly recognized
      datalabels: {
        display: (context: any) => context.dataset.data[0] >= 0.8,
        color: (context: any) => context.dataset.label.includes('Dừng') ? 'white' : 'black',
        anchor: 'center',
        align: 'center',
        formatter: (value: number) => `${value.toFixed(2)}%`,
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 25,
          boxHeight: 7,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          callback: function(tickValue: number | string) {
            return `${tickValue}%`;
          },
        },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div style={{ height: '140px' }} className="flex justify-center p-2">
      <h2 className="text-xl font-semibold mt-2 ml-4 dark:text-white">{machineName}</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <Bar
          data={getChartData()}
          options={chartOptions}
          plugins={[ChartDataLabels]}
        />
      )}
    </div>
  );
};

export default MachinePercent;
