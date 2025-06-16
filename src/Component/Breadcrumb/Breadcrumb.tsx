import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import {  supportItems, settingItems, adminItems, logoutItems } from '../../libs/menuItems';

interface MenuItem {
  link: string;
  name: string;
}


const findName = (path: string): string => {
  const allItems: MenuItem[] = [
      ...supportItems,
    ...settingItems,
    ...adminItems,
    ...logoutItems,
  ];

  const pathNamesMap: Record<string, string> = {
    '/importdata': 'Data Entry',
    '/QCS': 'Quality Control System',
    '/support': 'Support',
    '/settings': 'Settings',
    '/admin': 'Admin',
    '/logout': 'Logout',
  };

  if (pathNamesMap[path]) {
    return pathNamesMap[path];
  }

  const foundItem = allItems.find((item) => item.link === path);
  return foundItem ? foundItem.name : path;
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex justify-start items-center text-gray-600 p-2 mt-2">
      <div className="mr-2">
        <FiHome />
      </div>
      <div>
        <Link to="/">Home</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <span key={to}>
              {' > '}
              <Link to={to} className="font-bold capitalize">
                {findName(to)}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
