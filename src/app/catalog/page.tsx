'use client';
import { Button, Col, Layout, Row } from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from '@/styles/catalog.module.css'
import { Content } from 'antd/es/layout/layout';
import NavigationHeader from '@/components/NavigationHeader';

const page:React.FC = () => {
    return (
     
        <Layout className={styles.layout}>
          <NavigationHeader/>
           <Content className={styles.content}>
      <Button
        icon={<SearchOutlined />}
        type="primary"
        className={styles.searchButton}
      >
        Search
      </Button>

      <Row gutter={[16, 16]} justify="center" className={styles.row}>
        <Col span={4}>
          <Button className={styles.imageButton} href={'/catalog/1'}>
            <img src="/placeholder.png" alt="Recipe 1" />
          </Button>
        </Col>
        <Col span={4}>
          <Button className={styles.imageButton}>
            <img src="/placeholder.png" alt="Recipe 2" />
          </Button>
        </Col>
        <Col span={4}>
          <Button className={styles.imageButton}>
            <img src="/placeholder.png" alt="Recipe 3" />
          </Button>
        </Col>
        <Col span={4}>
          <Button className={styles.imageButton}>
            <img src="/placeholder.png" alt="Recipe 4" />
          </Button>
        </Col>
      </Row>
    </Content>
        </Layout>
    );
};

export default page;