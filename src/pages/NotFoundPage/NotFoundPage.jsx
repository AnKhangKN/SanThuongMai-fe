import React from 'react';
import { Button, Result } from 'antd';
const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Quay lại trang chủ</Button>}
  />
);

export default NotFoundPage;
