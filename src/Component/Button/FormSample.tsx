import React, { useRef } from 'react';
import { FiDownload } from 'react-icons/fi';

interface FormSampleProps {
  onClick?: () => void;
  label?: string;
  href?: string;
}

const FormSample: React.FC<FormSampleProps> = ({ onClick, label = "Tải Mẫu", href }) => {
  const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    if (href && hiddenLinkRef.current) {
      hiddenLinkRef.current.click(); 
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <button
        className="bg-[#284769] cursor-pointer text-sm text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        onClick={handleDownload}
      >
        <FiDownload className="mr-2" />
        {label}
      </button>
      {/* Liên kết ẩn để tải file */}
      {href && (
        <a
          href={href}
          download
          ref={hiddenLinkRef}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default FormSample;
