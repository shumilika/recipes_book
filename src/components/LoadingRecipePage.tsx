'use client';

import { Skeleton, Card, Row, Col } from 'antd';

export default function LoadingRecipePage() {
  return (
     <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0, width: '80%' }} />
  );
}
