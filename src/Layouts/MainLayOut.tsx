import React from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Header from '../Component/Header/Header';


interface MainLayoutProps {
 children: React.ReactNode;
 className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
 const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
//  const { userRole } = useContext(AuthContext);

 return (
   <div className={`lg:flex h-screen w-screen bg-gray-100 dark:bg-[#131c22] ${className}`}>
     <aside className={`bg-gray-500 lg:flex flex-shrink-0 transition-all duration-300 hidden ${isSidebarCollapsed ? 'w-20' : 'w-60'}`}>
       <Sidebar
         isCollapsed={isSidebarCollapsed}
         setIsCollapsed={setIsSidebarCollapsed}
        //  role={userRole}
       />
     </aside>
     <div className="flex flex-col flex-grow">
       <header className="flex-shrink-0 lg:ml-1">
            <Header />
       </header>
       <main className="lg:flex-grow bg-gray-400 dark:bg-[#131c22] lg:bg-transparent sm:bg-transparent  overflow-auto mt-0.5 lg:ml-1">
         {children}
       </main>
     </div>
   </div>
 );
};

export default MainLayout;