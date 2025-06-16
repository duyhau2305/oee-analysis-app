import React, { useState, useEffect, useRef } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeDropdown: React.FC = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [darkMode, setDarkMode] = useState(true);
 const dropdownRef = useRef<HTMLDivElement>(null);

 const toggleDarkMode = (mode: 'light' | 'dark') => {
   if (mode === 'light') {
     document.documentElement.classList.remove('dark');
     localStorage.setItem('theme', 'light');
     setDarkMode(false);
   } else if (mode === 'dark') {
     document.documentElement.classList.add('dark');
     localStorage.setItem('theme', 'dark');
     setDarkMode(true);
   }
   setIsOpen(false);
 };

 useEffect(() => {
   document.documentElement.classList.add('dark');
   setDarkMode(true);
 }, []);

 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
       setIsOpen(false);
     }
   };
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 return (
   <div className="relative z-50" ref={dropdownRef}>
     <button
       onClick={() => setIsOpen(!isOpen)}
       className="flex items-center px-4 py-2 bg-gray-100 dark:bg-[#0D2743] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#0D2743] transition"
     >
       {darkMode ? <FaMoon className="h-4 w-4 mr-2 text-gray-500 dark:text-white " /> : <FaSun className="h-4 w-4 mr-2 text-gray-500 dark:text-white" />}
       {darkMode ? <span data-translate="darkmode" className="text-gray-500 dark:text-white">Dark Mode</span> : <span data-translate="lightmode" className="text-gray-500 dark:text-white">Light Mode</span>}
     </button>
     {isOpen && (
       <div className="absolute mt-2 right-0 ml-2 w-[132px] bg-slate-100  dark:bg-[#0D2743] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
         <ul>
           <li
             className="flex items-center px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-600  cursor-pointer "
             onClick={() => toggleDarkMode('light')}
           >
             <FaSun className="h-4 w-4 mr-2 text-yellow-500" />
             <span className="text-gray-500 dark:text-white" > Light Mode </span>
           </li>
           <li
             className="flex items-center px-2  py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
             onClick={() => toggleDarkMode('dark')}
           >
             <FaMoon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-300" />
             <span className="text-gray-500 dark:text-white" >Dark Mode </span>
           </li>
         </ul>
       </div>
     )}
   </div>
 );
};

export default ThemeDropdown;