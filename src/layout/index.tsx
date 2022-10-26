import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Layout, Menu } from 'antd';
import { useRequest } from '@umijs/hooks';
const { Header, Content, Footer } = Layout;

const Index: React.FC = (props) => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className={styles.logo}>要搭MES系统通用代码编辑器</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content className="site-layout" style={{ marginTop: 64 }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

export default Index;
