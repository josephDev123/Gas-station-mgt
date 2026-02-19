import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Fuel } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { DashboardData } from "../types/IDashboard";
import { formatCurrency, formatNumber } from "../util/formatNumber";

type Props = {
  fuelLevels: DashboardData["FuelLevelStatus"];
};

export function FuelLevelCards({ fuelLevels }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fuelLevels.map((tank) => {
        const percentLeft =
          tank.volumeLeft != null
            ? (tank.volumeLeft / tank.fuelVolume) * 100
            : 0;
        const isLow = tank.status === "LOW" || percentLeft < 20;

        return (
          <Card
            key={tank.id}
            className={cn(
              "border-l-4",
              isLow ? "border-l-red-500" : "border-l-green-500",
            )}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{tank.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tank.fuelType} • {tank.unit}
                  </p>
                </div>
                {isLow && <AlertTriangle className="h-5 w-5 text-red-500" />}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Stock left</span>
                  <span>
                    {tank.volumeLeft ?? "—"} / {formatNumber(tank.fuelVolume)} L
                  </span>
                </div>
                <Progress
                  value={percentLeft}
                  className={cn(
                    "h-2",
                    isLow ? "[&>div]:bg-red-500" : "[&>div]:bg-green-500",
                  )}
                />
                <div className="text-xs text-muted-foreground">
                  Price: {formatCurrency(tank.price_per)} / L
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
