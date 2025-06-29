
import { Suspense } from 'react';
import { ExchangeFormContents } from '@/components/ExchangeFormContents';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ExchangePageLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="space-y-6 border border-border p-4 rounded-md">
                <Skeleton className="h-6 w-1/3" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
            <div className="space-y-6 border border-border p-4 rounded-md">
                <Skeleton className="h-6 w-1/3" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
            <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ExchangePage() {
  return (
    <Suspense fallback={<ExchangePageLoading />}>
      <ExchangeFormContents />
    </Suspense>
  );
}
