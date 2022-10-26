import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useRequest } from '@umijs/hooks';

const Index: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Card title="页面信息"></Card>
      <Card title="页面代码预览"></Card>
    </div>
  );
};
export default Index;
