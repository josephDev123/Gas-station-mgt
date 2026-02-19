import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function MetricCard({
  title,
  value,
  unit,
  change,
  icon,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {value} {unit}
          </div>
          {change && (
            <p className="text-xs text-muted-foreground mt-1">
              {change.startsWith("+") ? "↑" : "↓"} {change} vs yesterday
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
