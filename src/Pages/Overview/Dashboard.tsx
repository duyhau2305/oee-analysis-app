import React, { useState,useEffect } from 'react';
import DashboardGrid from '../../Component/Oveview/DashboardGrid';
import { Dropdown, Menu, Button } from 'antd';
import {mockMachines} from './mockData'
interface Machine {
  id: string;
  deviceId: string;
  currentStatus: string;
  timelineStartTime: string;
  timelineEndTime: string;
  productionTasks: Array<{
    shifts: Array<{
      status: string;
      employeeName: string[];
      shiftDetails: {
        startTime: string;
        endTime: string;
      };
    }>;
  }>;
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



const Dashboard1: React.FC = () => {
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');

  const menu = (
    <Menu>
      <Menu.Item key="asc">Sắp xếp theo thứ tự tăng dần</Menu.Item>
      <Menu.Item key="layout">Sắp xếp theo layout</Menu.Item>
    </Menu>
  );

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const area = e.target.value;
    setSelectedArea(area);
  };

  // Filter machines based on selected area
  useEffect(() => {
    const filtered = mockMachines.filter((machine) => {
      if (selectedArea === 'All Areas') return true;
      if (selectedArea === 'PHAY') return machine.deviceId.startsWith('P');
      if (selectedArea === 'TIEN') return machine.deviceId.startsWith('T');
      return true;
    });
    setFilteredMachines(filtered);
  }, [selectedArea]);

  return (
    <div className="w-full h-full relative bg-gray-100 p-2 overflow-auto">
      <div className="flex justify-end items-center mb-4 px-1">
        <div className="relative flex justify-end items-center space-x-2">
          <button className="bg-white border border-gray-300 rounded-lg py-2 px-4 leading-tight text-gray-800">
            Tổng số máy chạy: {filteredMachines.filter((m) => m.currentStatus === 'Run').length}/{filteredMachines.length} máy
          </button>
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-8 leading-tight"
          >
            <option value="All Areas">Tất cả khu vực</option>
            <option value="PHAY">Khu vực Phay</option>
            <option value="TIEN">Khu vực Tiện</option>
          </select>
          <Dropdown overlay={menu}>
            <Button className="bg-blue-500 text-white rounded-lg py-2 px-4 leading-tight">
              Sắp xếp thiết bị
            </Button>
          </Dropdown>
        </div>
      </div>

      <DashboardGrid machines={filteredMachines} />
    </div>
  );
};

export default Dashboard1;
