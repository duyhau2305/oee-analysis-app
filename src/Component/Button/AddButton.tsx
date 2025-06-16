import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface AddButtonProps {
  onClick: () => void;
  label?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label = "Thêm mới" }) => {
  return (
    <button
      className="bg-[#284769] cursor-pointer text-sm text-white px-3 py-2  rounded-md flex items-center hover:bg-blue-900 transition-colors"
      onClick={onClick}
    >
      <FiPlus className="mr-2" />
      {label}
    </button>
  );
};

export default AddButton;