'use client';

import { Skeleton, Card, Row, Col } from 'antd';

export default function LoadingCatalog() {
  return (
    <Row gutter={[16, 16]} justify="center">
      {Array.from({ length: 6 }).map((_, index) => (
        <Col span={4} key={index}>
          <Card cover={<Skeleton.Image active />} >
            <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0, width: '80%' }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
