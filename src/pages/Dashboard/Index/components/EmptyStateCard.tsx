import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

type Props = {
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode; // e.g. "Add first sale" button
};

export function EmptyStateCard({ message, icon, action }: Props) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {icon || (
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
        )}
        <p className="text-lg font-medium text-muted-foreground mb-2">
          {message}
        </p>
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  );
}
