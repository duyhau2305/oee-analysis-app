import  { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Form, Input, AutoComplete, Modal,message } from 'antd';
import AddButton from '../../Component/Button/AddButton';
import ExportExcelButton from '../../Component/Button/ExportExcelButton';
import SearchButton from '../../Component/Button/SearchButton';
import FormSample from '../../Component/Button/FormSample';
import ImportButton from '../../Component/Button/ImportButton';
import axios from 'axios';
import moment from 'moment';
import * as XLSX from 'xlsx';
const sampleTemplate = '/form/Thiết_bị.xlsx';


interface Device {
  _id: string;
  deviceId: string;
  deviceName: string;
  areaName: string;
  model: string;
  technicalSpecifications?: string;
  purchaseDate: string;
}


interface Area {
  _id: string;
  areaName: string;
}


interface DeviceFormValues {
  deviceId: string;
  deviceName: string;
  areaName: string;
  model: string;
  technicalSpecifications?: string;
  purchaseDate: string;
}

const DeviceSetting = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [form] = Form.useForm<DeviceFormValues>();
  const [sortOrderDate, setSortOrderDate] = useState<'asc' | 'desc'>('asc');
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);

  const sortDevicesByDate = () => {
    const sortedDevices = [...filteredDevices].sort((a, b) =>
      sortOrderDate === 'asc'
        ? new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
        : new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    );
    setFilteredDevices(sortedDevices);
    setSortOrderDate(sortOrderDate === 'asc' ? 'desc' : 'asc');
  };

  const sortDevicesAlphabetically = (devices: Device[]): Device[] => {
    return devices.sort((a, b) => a.deviceId.localeCompare(b.deviceId));
  };

  const fetchDevicesAndAreas = async () => {
    try {
      const deviceResponse = await axios.get<Device[]>(`${apiUrl}/device`);
      const sortedDevices = sortDevicesAlphabetically(deviceResponse.data);
      setDevices(sortedDevices);
      setFilteredDevices(sortedDevices);

      const areaResponse = await axios.get<Area[]>(`${apiUrl}/areas`);
      setAreas(areaResponse.data);
    } catch (error) {
      message.error('Failed to fetch devices or areas');
    }
  };

  useEffect(() => {
    fetchDevicesAndAreas();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDevices(devices);
    } else {
      const filtered = devices.filter((device) =>
        device.deviceId.toLowerCase().includes(query.toLowerCase()) ||
        device.deviceName.toLowerCase().includes(query.toLowerCase()) ||
        device.areaName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDevices(filtered);
    }
  };

  const checkDuplicateDevice = (deviceId: string, deviceIdToIgnore: string | null = null): boolean => {
    return devices.some((device) => {
      if (!deviceIdToIgnore) {
        return device.deviceId === deviceId;
      }
      return device._id !== deviceIdToIgnore && device.deviceId === deviceId;
    });
  };

  const handleSave = async (values: DeviceFormValues) => {
    const { deviceId } = values;

    if (!selectedDevice && checkDuplicateDevice(deviceId)) {
      message.error('Mã thiết bị đã tồn tại. Vui lòng nhập mã thiết bị khác.');
      return;
    }

    const deviceData = {
      ...values,
      areaName: values.areaName ? values.areaName.trim() : '',
      purchaseDate: moment(values.purchaseDate).format('YYYY-MM-DD'),
      _id: selectedDevice ? selectedDevice._id : null,
    };

    try {
      if (selectedDevice) {
        await axios.put<Device>(`${apiUrl}/device/${selectedDevice._id}`, deviceData);
        message.success('Cập nhật thiết bị thành công!');
      } else {
        await axios.post<Device>(`${apiUrl}/device`, deviceData);
        message.success('Thêm thiết bị thành công!');
      }
      fetchDevicesAndAreas();
      setIsModalOpen(false);
      setSelectedDevice(null);
      form.resetFields();
    } catch (error) {
     
      message.error('Failed to save device');
    }
  };

  const handleDelete = async () => {
    if (!deviceToDelete) return;
    try {
      await axios.delete<void>(`${apiUrl}/device/${deviceToDelete._id}`);
      message.success('Xóa thiết bị thành công!');
      fetchDevicesAndAreas();
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error('Failed to delete device');
    }
  };

  const convertExcelDate = (excelDate: number): string => {
    const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
    return moment(date).format('MM-DD-YYYY');
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((item: any) => {
        let purchaseDate = item['Ngày mua'];
        if (!isNaN(purchaseDate)) {
          purchaseDate = convertExcelDate(purchaseDate);
        } else {
          purchaseDate = moment(purchaseDate, ['DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']).format('MM-DD-YYYY');
        }

        return {
          deviceId: item['Mã thiết bị'],
          deviceName: item['Tên thiết bị'],
          areaName: item['Khu vực sản xuất'],
          model: item['Model thiết bị'],
          technicalSpecifications: item['Thông số kĩ thuật'],
          purchaseDate,
        };
      });

      const promises = formattedData.map(async (device: Device) => {
        try {
          const response = await axios.post<Device>(`${apiUrl}/device`, device);
          return response.data;
        } catch (error) {
          message.error('Failed to save device');
          return null;
        }
      });

      Promise.all(promises).then((results) => {
        const addedDevices = results.filter((device) => device !== null) as Device[];
        setDevices((prevDevices) => [...prevDevices, ...addedDevices]);
        setFilteredDevices((prevFiltered) => [...prevFiltered, ...addedDevices]);
        if (addedDevices.length) {
          message.success('Thêm thiết bị thành công!');
        }
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const openDeleteModal = (device: Device) => {
    setDeviceToDelete(device);
    setIsDeleteModalOpen(true);
  };

  const openModal = (device: Device | null = null) => {
    if (device) {
      setSelectedDevice(device);
      const formattedDate = moment(device.purchaseDate, ['DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');
      form.setFieldsValue({
        ...device,
        purchaseDate: formattedDate,
      });
    } else {
      setSelectedDevice(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-2  shadow-md rounded-md font-[Open_Sans] text-black dark:text-white">
      <div> <span className=" rounded-lg text-xl mb-4">Entry your device information</span></div>
      
      <hr  className="mt-1"/>
      <div className="flex items-center gap-2 mb-4 mt-2">
        <SearchButton
          placeholder="Tìm kiếm mã thiết bị, tên thiết bị, khu vực..."
          onSearch={(q:string) => handleSearch(q)}
        />
        <div className="flex items-center gap-2 ml-auto">
          <AddButton onClick={() => openModal()} />
          <FormSample href={sampleTemplate} label="Tải Form Mẫu" />
          <ImportButton onImport={handleImport} />
          <ExportExcelButton
            data={devices}
            parentComponentName="DanhSachThietBi"
            headers={[
              { key: 'deviceId', label: 'Mã thiết bị' },
              { key: 'deviceName', label: 'Tên thiết bị' },
              { key: 'areaName', label: 'Khu vực' },
              { key: 'model', label: 'Model' },
              { key: 'technicalSpecifications', label: 'Thông số kỹ thuật' },
              {
                key: 'purchaseDate',
                label: 'Ngày mua',
                transform: (purchaseDate: string) =>
                  purchaseDate ? moment(purchaseDate).format('DD-MM-YYYY') : 'N/A',
              },
            ]}
          />
        </div>
      </div>

      <table className="min-w-full bg-gray-200 border border-gray-200">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="border px-4 py-2 text-xs">STT</th>
            <th className="border px-4 py-2 text-xs">Mã thiết bị</th>
            <th className="border px-4 py-2 text-xs">Tên thiết bị</th>
            <th className="border px-4 py-2 text-xs">Khu vực sản xuất</th>
            <th className="border px-4 py-2 text-xs">Model thiết bị</th>
            <th className="border px-4 py-2 text-xs">Thông số kĩ thuật</th>
            <th className="border px-4 py-2 text-xs">
              Ngày mua
              <button onClick={sortDevicesByDate} className="ml-2">
                {sortOrderDate === 'asc' ? '▼' : '▲'}
              </button>
            </th>
            <th className="border px-4 py-2 text-xs">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={device._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-sm text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-sm text-center">{device.deviceId}</td>
              <td className="border px-4 py-2 text-sm text-center">{device.deviceName}</td>
              <td className="border px-4 py-2 text-sm text-center">{device.areaName}</td>
              <td className="border px-4 py-2 text-sm text-center">{device.model}</td>
              <td className="border px-4 py-2 text-sm text-center">{device.technicalSpecifications}</td>
              <td className="border px-4 py-2 text-sm text-center">
                {moment(device.purchaseDate).format('DD-MM-YYYY')}
              </td>
              <td className="py-2 px-2 text-center border">
                <button
                  className="mr-2 text-blue-500 hover:text-blue-700"
                  onClick={() => openModal(device)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => openDeleteModal(device)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title={selectedDevice ? 'Chỉnh sửa Thiết Bị' : 'Thêm mới Thiết Bị'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Mã Thiết Bị"
            name="deviceId"
            rules={[{ required: true, message: 'Mã Thiết Bị là bắt buộc' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên Thiết Bị"
            name="deviceName"
            rules={[{ required: true, message: 'Tên Thiết Bị là bắt buộc' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Khu Vực"
            name="areaName"
            rules={[{ required: true, message: 'Khu Vực là bắt buộc' }]}
          >
            <AutoComplete
              options={areas.map((area) => ({ value: area.areaName }))}
              onChange={(value) => {
                form.setFieldsValue({ areaName: value });
              }}
              placeholder="Nhập khu vực"
              filterOption={(inputValue, option) =>
                option!.value.toLowerCase().includes(inputValue.toLowerCase())
              }
            >
              <Input />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Model là bắt buộc' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Thông Số Kỹ Thuật" name="technicalSpecifications">
            <Input />
          </Form.Item>

          <Form.Item label="Ngày Mua" name="purchaseDate">
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onOk={handleDelete}
      >
        <p>Bạn có chắc chắn muốn xóa thiết bị này không?</p>
      </Modal>
    </div>
  );
};

export default DeviceSetting;