import React, { useState, Fragment,  } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineMenu } from 'react-icons/hi';
import { FiHome, FiPercent, FiCalendar, FiBarChart2, FiFolder, FiLogOut, FiSettings, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// import { AuthContext } from '../../context/AuthContext';

const MobileMenuDropdown: React.FC = () => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
//  const navigate = useNavigate();
//  const { userRole } = useContext(AuthContext);

//  const handleLogout = () => {
//    localStorage.removeItem('token');
//    localStorage.removeItem('role');
//    toast.success('Đăng xuất thành công');
//    navigate('/login');
//    setIsSidebarOpen(false);
//  };

 const toggleSidebar = () => {
   setIsSidebarOpen(!isSidebarOpen);
 };

 const toggleSubmenu = () => {
   setIsSubmenuOpen(!isSubmenuOpen);
 };

 return (
   <>
     <div className="lg:hidden sm:flex">
       <button className="mr-2 text-5xl dark:text-gray-300 cursor-pointer" onClick={toggleSidebar}>
         <HiOutlineMenu />
       </button>
       
     </div>

     <Transition
       as={Fragment}
       show={isSidebarOpen}
       enter="transition ease-out duration-300"
       enterFrom="transform -translate-x-full"
       enterTo="transform translate-x-0"
       leave="transition ease-in duration-200"
       leaveFrom="transform translate-x-0"
       leaveTo="transform -translate-x-full"
     >
       <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
         <div className="flex flex-col h-full">
           <div className="p-4 flex justify-between items-center">
             <h2 className="text-lg font-semibold dark:text-white">Menu</h2>
             <button onClick={toggleSidebar} className="text-2xl dark:text-white">
               &times;
             </button>
           </div>

           <hr />

           <nav className="flex-grow p-4 space-y-4 text-gray-700 dark:text-white">
             {/* {userRole === 'CNVH' ? (
               <>
                 <Link to="/dashboard/mobile" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiHome className="mr-4 text-lg" /> Trang chủ
                 </Link>
                 <Link to="/workshift" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiSettings className="mr-4 text-lg" /> Lịch làm việc
                 </Link>
                 <button
                //    onClick={handleLogout}
                   className="flex items-center text-white hover:text-red-500 focus:outline-none"
                 >
                   <FiLogOut className="mr-4 text-lg" /> Đăng xuất
                 </button>
               </>
             ) : ( */}
               <>
                 <Link to="/dashboard" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiHome className="mr-4 text-lg" /> Trang chủ
                 </Link>

                 <div className="space-y-1">
                   <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer" onClick={toggleSubmenu}>
                     <div className="flex items-center">
                       <FiSettings className="mr-4 text-lg" /> Nhập dữ liệu cơ bản
                     </div>
                     {isSubmenuOpen ? <FiChevronDown /> : <FiChevronRight />}
                   </div>

                   {isSubmenuOpen && (
                     <div className="ml-12 space-y-2">
                       <Link to="/importdata/areas" className="block hover:text-blue-500" onClick={toggleSidebar}>
                         Khu vực
                       </Link>
                       <Link to="/importdata/devivce" className="block hover:text-blue-500" onClick={toggleSidebar}>
                         Thiết bị
                       </Link>
                       <Link to="/importdata/issue" className="block hover:text-blue-500" onClick={toggleSidebar}>
                         Nguyên nhân dừng máy
                       </Link>
                       <Link to="/importdata/shift" className="block hover:text-blue-500" onClick={toggleSidebar}>
                         Ca làm việc
                       </Link>
                       <Link to="/importdata/employee" className="block hover:text-blue-500" onClick={toggleSidebar}>
                         Nhân viên
                       </Link>
                     </div>
                   )}
                 </div>

                 <Link to="/QCS/availablerate" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiPercent className="mr-4 text-lg" /> Tỷ lệ máy chạy
                 </Link>

                 <Link to="/QCS/schedule" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiCalendar className="mr-4 text-lg" /> Nhiệm vụ sản xuất
                 </Link>

                 <Link to="/QCS/analysis" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiBarChart2 className="mr-4 text-lg" /> Phân tích
                 </Link>

                 <Link to="/QCS/reports" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                   <FiFolder className="mr-4 text-lg" /> Báo cáo
                 </Link>

         
                   <Link to="/admin/userlist" className="flex items-center hover:text-blue-500" onClick={toggleSidebar}>
                     <FiSettings className="mr-4 text-lg" /> Quản lý tài khoản
                   </Link>
       

                 <button
                   
                   className="flex items-center text-white hover:text-red-500 focus:outline-none"
                 >
                   <FiLogOut className="mr-4 text-lg" /> Đăng xuất
                 </button>
               </>
             
           </nav>
         </div>
       </div>
     </Transition>
   </>
 );
};

export default MobileMenuDropdown;