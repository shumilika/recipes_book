'use client';

import { Skeleton,  } from 'antd';

export default function LoadingRecipePage() {
  return (
     <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0, width: '80%' }} />
  );
}
