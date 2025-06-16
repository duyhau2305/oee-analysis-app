
import { Menu, Dropdown, Space } from 'antd';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useLanguage } from '../../Locales/LanguageContext';

const Translate = () => {
 const { language, setLanguage } = useLanguage();

 const handleChange = (value: string) => {
   setLanguage(value);
 };

 const menu = (
   <Menu>
     <Menu.Item key="en" onClick={() => handleChange('en')}>
       English
     </Menu.Item>
     <Menu.Item key="vi" onClick={() => handleChange('vi')}>
       Tiếng Việt
     </Menu.Item>
     <Menu.Item key="zh" onClick={() => handleChange('zh')}>
       中文
     </Menu.Item>
   </Menu>
 );

 return (
   <Space className="flex items-center">
     <Dropdown overlay={menu} trigger={["click"]}>
       <div className="flex items-center cursor-pointer">
         <FaGlobeAmericas className="text-gray-600 dark:text-white mr-2" />
         <span className="text-gray-600 dark:text-white">{language.toUpperCase()}</span>
       </div>
     </Dropdown>
   </Space>
 );
};

export default Translate;