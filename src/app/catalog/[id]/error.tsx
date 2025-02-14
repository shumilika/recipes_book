'use client';

import { useEffect } from 'react';
import { Button, Result } from 'antd';

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Catalog error:', error);
  }, [error]);

  return (
    <Result
      status="500"
      title="Failed to Load Recipe"
      subTitle="An error occurred while fetching this recipe. Please try again."
      extra={
        <Button type="primary" onClick={() => reset()}>
          Retry
        </Button>
      }
    />
  );
}
