import React, { useRef } from 'react';
import { FiFilePlus } from 'react-icons/fi';

interface ImportButtonProps {
  onImport: (file: File) => void;
  label?: string;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onImport, label = "Nhập Dữ liệu" }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        className="bg-[#284769] cursor-pointer text-sm text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        onClick={handleButtonClick}
      >
        <FiFilePlus className="mr-2" />
        {label}
      </button>
    </div>
  );
};

export default ImportButton;