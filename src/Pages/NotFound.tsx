import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Về trang chủ
        </Button>
      }
    />
  );
};

export default NotFound; 