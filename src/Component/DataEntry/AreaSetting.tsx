import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Form, message } from 'antd';
import AddButton from '../../Component/Button/AddButton';
import ExportExcelButton from '../../Component/Button/ExportExcelButton';
import SearchButton from '../../Component/Button/SearchButton';
import FormSample from '../../Component/Button/FormSample';
import ImportButton from '../../Component/Button/ImportButton';
import axios from 'axios';
import * as XLSX from 'xlsx';


// Import sample template
const sampleTemplate = '/form/Khu_vực_sản_xuất.xlsx';


interface Area {
  _id?: string;
  areaCode: string;
  areaName: string;
}

const AreasManagement: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);
  const [form] = Form.useForm();
  
  const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

  const fetchAreas = async () => {
    try {
      const response = await axios.get<Area[]>(`${apiUrl}/areas`);
      setAreas(response.data);
      setFilteredAreas(response.data);
    } catch (error) {
      message.error('Failed to fetch areas management');
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = areas.filter(area =>
      area.areaCode.toLowerCase().includes(query.toLowerCase()) ||
      area.areaName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAreas(filtered);
  };

  const handleSave = async (values: Area) => {
    const areaData: Area = { ...values, _id: selectedArea ? selectedArea._id : undefined };
    try {
      if (selectedArea) {
        await axios.put(`${apiUrl}/areas/${selectedArea._id}`, areaData);
        message.success('Cập nhật khu vực thành công!');
      } else {
        await axios.post(`${apiUrl}/areas`, areaData);
        message.success('Thêm khu vực thành công!');
      }
      fetchAreas();
      setIsModalOpen(false);
      setSelectedArea(null);
      form.resetFields();
    } catch (error) {
      message.error('Failed to save area');
    }
  };

  const handleDelete = async () => {
    if (!areaToDelete) return;
    try {
      await axios.delete(`${apiUrl}/areas/${areaToDelete._id}`);
      message.success('Xóa khu vực thành công!');
      fetchAreas();
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error('Failed to delete area');
    }
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData: Area[] = jsonData.map((item: any) => ({
        areaCode: item['Mã khu vực sản xuất'],
        areaName: item['Tên khu vực sản xuất'],
      }));

      const promises = formattedData.map(async (area) => {
        try {
          const response = await axios.post(`${apiUrl}/areas`, area);
          return response.data;
        } catch (error) {
          message.error('Failed to save area');
          return null;
        }
      });

      Promise.all(promises).then((results) => {
        const addedAreas = results.filter((area) => area !== null);
        setAreas((prevAreas) => [...prevAreas, ...addedAreas]);
        setFilteredAreas((prevFiltered) => [...prevFiltered, ...addedAreas]);
        message.success('Thêm khu vực thành công!');
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-2 font-[Open_Sans] dark:text-white shadow-md rounded-md">
      <div> <span className=" rounded-lg text-xl mb-4">Entry your area information</span></div>
      <hr />
      <div className="flex items-center gap-2 mb-4 mt-2">
        <SearchButton placeholder="Tìm kiếm mã khu vực, tên khu vực..." onSearch={handleSearch} />
        <div className="flex items-center gap-2 ml-auto">
          <AddButton onClick={() => setIsModalOpen(true)} />
          <FormSample href={sampleTemplate} label="Tải Form Mẫu" />
          <ImportButton onImport={handleImport} />
          <ExportExcelButton data={areas} parentComponentName="DanhSachKhuVuc" headers={[
            { key: 'areaCode', label: 'Mã khu vực' },
            { key: 'areaName', label: 'Tên khu vực' },
          ]} />
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
        <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="border px-4 py-2 text-xs">STT</th>
            <th className="border px-4 py-2 text-xs">Mã Khu Vực</th>
            <th className="border px-4 py-2 text-xs">Tên Khu Vực</th>
            <th className="border px-4 py-2 text-xs">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredAreas.map((area, index) => (
            <tr key={area._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-sm text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-sm text-center">{area.areaCode}</td>
              <td className="border px-4 py-2 text-sm text-center">{area.areaName}</td>
              <td className="py-2 px-2 text-center border">
                <FaEdit className="mr-2 text-blue-500 cursor-pointer" onClick={() => setSelectedArea(area)} />
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => setAreaToDelete(area)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AreasManagement;
