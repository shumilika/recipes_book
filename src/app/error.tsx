'use client';

import { useEffect } from 'react';
import { Button, Result } from 'antd';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <Result
      status="500"
      title="Something went wrong!"
      subTitle="An unexpected error occurred. Please try again."
      extra={
        <Button type="primary" onClick={() => reset()}>
          Try Again
        </Button>
      }
    />
  );
}
