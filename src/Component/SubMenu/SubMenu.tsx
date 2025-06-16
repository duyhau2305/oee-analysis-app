import React, { useState } from 'react';
import { Link,} from 'react-router-dom';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

interface MenuItem {
  name: string;
  link: string;
}

interface SubmenuProps {
  title: React.ReactNode;
  items: MenuItem[];
  isCollapsed: boolean;
  mainLink: string;
  setIsCollapsed: (collapsed: boolean) => void;
  onSubmenuClick?: () => void;
}

const Submenu: React.FC<SubmenuProps> = ({ 
  title, 
  items, 
  isCollapsed, 
  
  setIsCollapsed,
  onSubmenuClick 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 

  const toggleSubmenu = (): void => {
    if (isCollapsed) {
      setIsCollapsed(false);
    } else {
      setIsOpen(!isOpen);
    }
    onSubmenuClick?.();
  };

 

  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center justify-between text-gray-500 hover:text-black cursor-pointer"
        onClick={toggleSubmenu}
      >
        <span className="flex items-center">
          {title}
        </span>
        <span>
          {isCollapsed ? (
            <FiChevronRight onClick={() => setIsCollapsed(false)} />
          ) : isOpen ? (
            <FiChevronDown className="dark:text-white" />
          ) : (
            <FiChevronRight className="dark:text-white"/>
          )}
        </span>
      </div>
      <div className={`${isOpen && !isCollapsed ? 'block' : 'hidden'} pl-2 mt-2`}>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="block py-1 px-1 text-sm ml-8 text-gray-500 dark:text-white hover:text-blue-500"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Submenu;