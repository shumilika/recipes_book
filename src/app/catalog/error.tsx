'use client';

import { useEffect } from 'react';
import { Button, Result } from 'antd';
import { BugOutlined } from '@ant-design/icons';

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Recipe error:', error);
  }, [error]);

  return (
    <Result
    icon={<BugOutlined />}
      // status="500"
      title="Failed to Load Recipes"
      subTitle="An error occurred while fetching recipes. Please try again."
      extra={
        <Button type="primary" onClick={() => reset()}>
          Retry
        </Button>
      }
    />
  );
}
