import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchButtonProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ placeholder = "Search...", onSearch }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(e.currentTarget.value);
    }
  };

  const handleButtonClick = () => {
    const inputElement = document.querySelector('input') as HTMLInputElement | null;
    if (inputElement) {
      onSearch(inputElement.value);
    }
  };

  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder={placeholder} 
        className="border rounded-full pl-3 pr-10 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-gray-300"
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleButtonClick}
        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 focus:outline-none"
      >
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchButton;
