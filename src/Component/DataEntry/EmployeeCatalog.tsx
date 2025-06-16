import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


import { Modal, Form, Input, Select, message} from 'antd';
import SearchButton from '../Button/SearchButton';
import AddButton from '../Button/AddButton';
import ExportExcelButton from '../Button/ExportExcelButton';
import FormSample from '../Button/FormSample';
import ImportButton from '../Button/ImportButton';
import axios from 'axios';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
const sampleTemplate = '/form/Thiết_bị.xlsx';
import * as XLSX from 'xlsx';

const { Option } = Select;

interface Employee {
  _id: string;
  employeeCode: string;
  employeeName: string;
  areaName: string;
}

interface Area {
  _id: string;
  areaName: string;
}

const EmployeeCatalog: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

  // Fetch employees from API
  const fetchEmployees = async (): Promise<void> => {
    try {
      const response = await axios.get<Employee[]>(`${apiUrl}/employees`);
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách nhân viên');
    }
  };

  // Fetch areas from API
  const fetchAreas = async (): Promise<void> => {
    try {
      const response = await axios.get<Area[]>(`${apiUrl}/areas`);
      setAreas(response.data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách khu vực');
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (employee: Employee): void => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAreas();
  }, []);

  // Handle search input change
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    const filtered = employees.filter(
      (employee) =>
        employee.employeeCode.toLowerCase().includes(query.toLowerCase()) ||
        employee.employeeName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Handle file import
  const handleImport = (file: File): void => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((item: any) => ({
        employeeCode: item['Mã nhân viên'],
        employeeName: item['Tên nhân viên'],
        areaName: item['Tên khu vực sản xuất'],
      }));

      const promises = formattedData.map(async (employee: Employee) => {
        try {
          const response = await axios.post<Employee>(`${apiUrl}/employees`, employee);
          return response.data;
        } catch (error) {
          message.error('Failed to save employee');
          return null;
        }
      });

      Promise.all(promises).then((results) => {
        const addedEmployees = results.filter((employee): employee is Employee => employee !== null);
        setEmployees((prev) => [...prev, ...addedEmployees]);
        setFilteredEmployees((prev) => [...prev, ...addedEmployees]);
        message.success('Thêm nhân viên thành công!');
      });
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle saving new or edited employee
  const handleSave = async (values: Employee): Promise<void> => {
    try {
      if (selectedEmployee) {
        await axios.put(`${apiUrl}/employees/${selectedEmployee._id}`, values);
        message.success('Cập nhật nhân viên thành công!');
      } else {
        await axios.post(`${apiUrl}/employees`, values);
        message.success('Thêm nhân viên thành công!');
      }
      fetchEmployees();
      setIsModalOpen(false);
      setSelectedEmployee(null);
      form.resetFields();
    } catch (error) {
      message.error('Mã nhân viên không được trùng nhau');
    }
  };

  // Handle delete employee
  const handleDelete = async (): Promise<void> => {
    if (!employeeToDelete) return;
    try {
      await axios.delete(`${apiUrl}/employees/${employeeToDelete._id}`);
      message.success('Xóa nhân viên thành công!');
      fetchEmployees();
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error('Lỗi khi xóa nhân viên');
    }
  };

  // Open modal for adding or editing
  const openModal = (employee: Employee | null = null): void => {
    setIsModalOpen(true);
    if (employee) {
      setSelectedEmployee(employee);
      form.setFieldsValue(employee);
    } else {
      setSelectedEmployee(null);
      form.resetFields();
    }
  };

  return (
    <div className="p-4  shadow-md rounded-md">
      <Breadcrumb />
      <div className="flex items-center gap-2 mb-4">
        <SearchButton
          placeholder="Tìm kiếm mã nhân viên, tên nhân viên..."
          onSearch={handleSearch}
        />
        <div className="flex-grow" />
        <AddButton onClick={() => openModal()} />
        <FormSample href={sampleTemplate} label="Tải Form Mẫu" />
        <ImportButton onImport={handleImport} />
        <ExportExcelButton data={filteredEmployees} fileName="DanhSachNhanVien.xlsx" />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-xs">STT</th>
            <th className="border px-4 py-2 text-xs">Mã Nhân Viên</th>
            <th className="border px-4 py-2 text-xs">Tên Nhân Viên</th>
            <th className="border px-4 py-2 text-xs">Khu Vực</th>
            <th className="border px-4 py-2 text-xs">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-sm text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-sm text-center">{employee.employeeCode}</td>
              <td className="border px-4 py-2 text-sm text-center">{employee.employeeName}</td>
              <td className="border px-4 py-2 text-sm text-center">{employee.areaName}</td>
              <td className="py-2 px-2 text-center border">
                <button
                  className="mr-2 text-blue-500 hover:text-blue-700"
                  onClick={() => openModal(employee)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => openDeleteModal(employee)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title={selectedEmployee ? 'Chỉnh sửa Nhân Viên' : 'Thêm mới Nhân Viên'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Mã Nhân Viên"
            name="employeeCode"
            rules={[{ required: true, message: 'Mã Nhân Viên là bắt buộc' }]}
          >
            <Input placeholder="Nhập mã nhân viên" />
          </Form.Item>

          <Form.Item
            label="Tên Nhân Viên"
            name="employeeName"
            rules={[{ required: true, message: 'Tên Nhân Viên là bắt buộc' }]}
          >
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>

          <Form.Item
            label="Khu Vực"
            name="areaName"
            rules={[{ required: true, message: 'Khu Vực là bắt buộc' }]}
          >
            <Select placeholder="Chọn khu vực">
              {areas.map((area) => (
                <Option key={area._id} value={area.areaName}>
                  {area.areaName}
                </Option>
              ))}
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
        <p>Bạn có chắc chắn muốn xóa ca nhân viên này không?</p>
      </Modal>

     
    </div>
  );
};

export default EmployeeCatalog;