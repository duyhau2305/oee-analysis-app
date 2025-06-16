import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Form, Input, message, Select } from 'antd';

import AddButton from '../../Component/Button/AddButton';
import ExportExcelButton from '../../Component/Button/ExportExcelButton';
import SearchButton from '../../Component/Button/SearchButton';
import FormSample from '../../Component/Button/FormSample';
import ImportButton from '../../Component/Button/ImportButton';
import axios from 'axios';


const sampleTemplate = '/form/Thiết_bị.xlsx';

// Define interfaces for your data
interface ErrorReport {
  _id: string;
  reasonCode: string;
  reasonName: string;
  deviceStatus: string;
  deviceNames: string[];
}

interface Device {
  deviceName: string;
}

const { Option } = Select;

const ErrorReportCatalog: React.FC = () => {
  const [errorReports, setErrorReports] = useState<ErrorReport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<ErrorReport | null>(null);
  const [deviceSuggestions, setDeviceSuggestions] = useState<Device[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [errorToDelete, setErrorToDelete] = useState<ErrorReport | null>(null);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

  // Fetch error reports from API
  const fetchErrorReports = async (): Promise<void> => {
    try {
      const response = await axios.get<ErrorReport[]>(`${apiUrl}/issue`);
      setErrorReports(response.data);
    } catch (error) {
      message.error('Lỗi khi tải nguyên nhân');
    }
  };

  // Fetch device suggestions from API
  const fetchDeviceSuggestions = async (): Promise<void> => {
    try {
      const response = await axios.get<Device[]>(`${apiUrl}/device`);
      setDeviceSuggestions(response.data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách thiết bị');
    }
  };
// const handleimport {
//     console.log('import');
// }
  // Load data on component mount
  useEffect(() => {
    fetchErrorReports();
    fetchDeviceSuggestions();
  }, []);

  // Save (create or update) an error report
  const handleSave = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (selectedReport) {
        await axios.put(`${apiUrl}/issue/${selectedReport._id}`, values);
        message.success('Cập nhật nguyên nhân thành công!');
      } else {
        await axios.post(`${apiUrl}/issue`, values);
        message.success('Thêm mới nguyên nhân thành công!');
      }
      fetchErrorReports();
      setIsModalOpen(false);
      setSelectedReport(null);
      form.resetFields();
    } catch (error) {
      message.error('Lỗi khi lưu nguyên nhân');
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (error: ErrorReport): void => {
    setErrorToDelete(error);
    setIsDeleteModalOpen(true);
  };

  // Delete an error report
  const handleDelete = async (): Promise<void> => {
    if (!errorToDelete) return;
    try {
      await axios.delete(`${apiUrl}/issue/${errorToDelete._id}`);
      message.success('Xóa nguyên nhân thành công!');
      fetchErrorReports();
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error('Lỗi khi xóa nguyên nhân');
    }
  };

  // Open modal for adding/editing
  const openModal = (report: ErrorReport | null = null): void => {
    setIsModalOpen(true);
    if (report) {
      setSelectedReport(report);
      form.setFieldsValue(report);
    } else {
      setSelectedReport(null);
      form.resetFields();
    }
  };

  // Filter reports based on search query
  const filteredReports = errorReports.filter((report) =>
    report.reasonCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.reasonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (report.deviceNames && report.deviceNames.join(', ').toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4  shadow-md rounded-md font-[Open_Sans]  dark:text-white">
      <h2 className="text-2xl font-semibold">Entry your errorcatalog information</h2>
      <hr />
     
      <div className="flex items-center gap-2 mb-4 mt-3">
        <SearchButton placeholder="Tìm kiếm mã lỗi, mã thiết bị..." onSearch={(q: string) => setSearchQuery(q)} />
        <div className="flex items-center gap-2 ml-auto">
          <AddButton onClick={() => openModal()} />
          <FormSample href={sampleTemplate} label="Tải Form Mẫu" />
          <ImportButton onImport={handleSave} />
          <ExportExcelButton
            data={errorReports}
            parentComponentName="DanhSachNguyenNhan"
            headers={[
              { key: 'reasonCode', label: 'Mã nguyên nhân' },
              { key: 'reasonName', label: 'Tên nguyên nhân' },
              { key: 'deviceStatus', label: 'Trạng thái thiết bị' },
              {
                key: 'deviceNames',
                label: 'Tên thiết bị',
                transform: (deviceNames: string[]) => deviceNames.join(', '),
              },
            ]}
          />
        </div>
      </div>

      <table className="min-w-full bg-gray-700 border border-gray-200">
        <thead>
          <tr className="bg-gray-800">
            <th className="border px-4 py-2 text-xs">STT</th>
            <th className="border px-4 py-2 text-xs">Mã nguyên nhân</th>
            <th className="border px-4 py-2 text-xs">Tên nguyên nhân</th>
            <th className="border px-4 py-2 text-xs">Trạng thái thiết bị</th>
            <th className="border px-4 py-2 text-xs">Tên thiết bị</th>
            <th className="border px-4 py-2 text-xs">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={report._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-sm text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-sm text-center w-44">{report.reasonCode}</td>
              <td className="border px-4 py-2 text-sm text-center w-44">{report.reasonName}</td>
              <td className="border px-4 py-2 text-sm text-center w-44">{report.deviceStatus}</td>
              <td className="border px-4 py-2 text-sm text-center w-86 text-wrap">
                {report.deviceNames && report.deviceNames.join(', ')}
              </td>
              <td className="py-2 px-2 text-center border">
                <button
                  className="mr-2 text-blue-500 hover:text-blue-700"
                  onClick={() => openModal(report)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => openDeleteModal(report)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title={selectedReport ? 'Chỉnh sửa Nguyên Nhân' : 'Thêm mới Nguyên Nhân'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedReport(null);
          form.resetFields();
        }}
        onOk={handleSave}
        okText={selectedReport ? 'OK' : 'OK'}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã Nguyên Nhân"
            name="reasonCode"
            rules={[{ required: true, message: 'Mã Nguyên Nhân là bắt buộc' }]}
          >
            <Input placeholder="Nhập mã nguyên nhân" />
          </Form.Item>

          <Form.Item
            label="Tên Nguyên Nhân"
            name="reasonName"
            rules={[{ required: true, message: 'Tên Nguyên Nhân là bắt buộc' }]}
          >
            <Input placeholder="Nhập tên nguyên nhân" />
          </Form.Item>

          <Form.Item
            label="Thiết Bị"
            name="deviceNames"
            rules={[{ required: true, message: 'Thiết Bị là bắt buộc' }]}
          >
            <Select mode="multiple" placeholder="Chọn thiết bị" allowClear>
              {deviceSuggestions.map((device) => (
                <Option key={device.deviceName} value={device.deviceName}>
                  {device.deviceName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Trạng thái thiết bị"
            name="deviceStatus"
            rules={[{ required: true, message: 'Trạng thái thiết bị là bắt buộc' }]}
          >
            <Select placeholder="Chọn trạng thái thiết bị">
              <Select.Option value="DỪNG">DỪNG</Select.Option>
              <Select.Option value="CHỜ">CHỜ</Select.Option>
              <Select.Option value="TẮT MÁY">TẮT MÁY</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onOk={handleDelete}
      >
        <p>Bạn có chắc chắn muốn xóa nguyên nhân này không?</p>
      </Modal>

      
    </div>
  );
};

export default ErrorReportCatalog;