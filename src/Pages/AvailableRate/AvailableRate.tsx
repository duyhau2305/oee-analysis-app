import React, { useState, useEffect } from 'react';
import { Select, DatePicker, Button, Dropdown, Menu } from 'antd';
import { SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
// import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import AvailableGrid from '../../Component/AvailableRate/AvailableGrid';
import MachineComparisonChart from '../../Component/AvailableRate/MachineComparisonChart';
import dayjs from 'dayjs';
import moment from 'moment';

const { Option } = Select;

// Mock data
const mockAreas = [
  { _id: '1', areaName: 'Khu vực A' },
  { _id: '2', areaName: 'Khu vực B' },
  { _id: '3', areaName: 'Khu vực C' },
];

const mockDevices = [
  { _id: '1', deviceName: 'Máy 1', areaName: 'Khu vực A', status: 'running', efficiency: 85 },
  { _id: '2', deviceName: 'Máy 2', areaName: 'Khu vực A', status: 'idle', efficiency: 75 },
  { _id: '3', deviceName: 'Máy 3', areaName: 'Khu vực B', status: 'running', efficiency: 90 },
  { _id: '4', deviceName: 'Máy 4', areaName: 'Khu vực B', status: 'maintenance', efficiency: 0 },
  { _id: '5', deviceName: 'Máy 5', areaName: 'Khu vực C', status: 'running', efficiency: 88 },
  { _id: '6', deviceName: 'Máy 6', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '7', deviceName: 'Máy 7', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '8', deviceName: 'Máy 8', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '9', deviceName: 'Máy 9', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '10', deviceName: 'Máy 10', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '11', deviceName: 'Máy 11', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '12', deviceName: 'Máy 12', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '13', deviceName: 'Máy 13', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '14', deviceName: 'Máy 14', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '15', deviceName: 'Máy 15', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '16', deviceName: 'Máy 16', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '17', deviceName: 'Máy 17', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '18', deviceName: 'Máy 18', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '19', deviceName: 'Máy 19', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
  { _id: '20', deviceName: 'Máy 20', areaName: 'Khu vực C', status: 'idle', efficiency: 82 },
];

function AvailableRate() {
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [areaData, setAreaData] = useState(mockAreas);
  const [deviceData, setDeviceData] = useState(mockDevices);
  const [isPercentageView, setIsPercentageView] = useState(false);

  const getFilteredDevices = (area:any) => {
    if (!area || area === 'all') return deviceData;
    return deviceData.filter((device:any) => device?.areaName === area);
  };

  const handleAreaSelect = (value:any) => {
    setSelectedArea(value);
  };

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  };

  const handleMenuClick = ({ key }:any) => {
    setIsPercentageView(key === 'percentage');
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="percentage">Hiển thị %</Menu.Item>
      <Menu.Item key="hours">Hiển thị giờ</Menu.Item>
    </Menu>
  );

  const filteredDevices = getFilteredDevices(selectedArea);

  return (
    <div>
      <div className="flex justify-end flex-shrink-0 mt-1  items-center mb-4">
        {/* <Breadcrumb /> */}
        <div className="flex justify-between  items-center space-x-2">
          <Select
            value={selectedArea}
            onChange={handleAreaSelect}
            className='!mr-2'
            placeholder="Chọn khu vực"
            style={{ width: 150 }}
            allowClear
          >
            <Option value="all">Toàn nhà máy</Option>
            {areaData.map((area:any) => (
              <Option key={area._id} value={area.areaName}>{area.areaName}</Option>
            ))}
          </Select>

          <Button onClick={() => setSelectedDate(dayjs())}>Hôm nay</Button>
          <Button onClick={() => setSelectedDate(dayjs().subtract(1, 'day'))}>Hôm qua</Button>

          <Button icon={<LeftOutlined />} onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))} />
          <DatePicker 
            onChange={handleDateChange} 
            value={selectedDate} 
            defaultValue={dayjs()} 
          />
          <Button icon={<RightOutlined />} onClick={() => setSelectedDate(selectedDate.add(1, 'day'))} />

          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<SettingOutlined />} />
          </Dropdown>
        </div>
      </div>

      <div className="grid grid-rows-3 gap-4 ">
        <div className="row-span-2">
          <AvailableGrid
            machines={filteredDevices}
            machineType={selectedArea}
            selectedDate={moment(selectedDate.toDate())}
            viewMode={isPercentageView ? 'compact' : 'normal'}
          />
        </div>
        
        <div className="row-span-1">
          <MachineComparisonChart 
            selectedDate={moment(selectedDate.toDate())}
            machineType={filteredDevices}
            viewMode={isPercentageView ? 'percentage' : 'hours'}
          />
        </div>
      </div>    
    </div>
  );
}

export default AvailableRate;
