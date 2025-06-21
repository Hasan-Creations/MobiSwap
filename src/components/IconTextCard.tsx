import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IconTextCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function IconTextCard({ icon: Icon, title, description }: IconTextCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="flex flex-col items-center pb-2">
        <div className="p-4 bg-accent/20 rounded-full mb-3">
          <Icon className="h-10 w-10 text-accent" />
        </div>
        <CardTitle className="text-xl font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
