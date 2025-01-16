'use client';
import React from 'react';
import { Layout } from 'antd';
import NavigationHeader from '@/components/NavigationHeader';

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <NavigationHeader />
      <Content>
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
