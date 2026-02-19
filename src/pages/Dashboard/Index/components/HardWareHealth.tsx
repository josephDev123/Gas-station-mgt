"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plug, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { type DashboardData } from "../types/IDashboard";

type Props = {
  health: DashboardData["hardwareHealth"];
};

export function HardwareHealth({ health }: Props) {
  const pumpActive =
    health.pumpHealth.find((h) => h.status === "ACTIVE")?._count.status || 0;
  const pumpTotal = health.pumpHealth.reduce(
    (sum, h) => sum + h._count.status,
    0,
  );
  const pumpHealthPercent =
    pumpTotal > 0 ? Math.round((pumpActive / pumpTotal) * 100) : 0;

  const nozzleActive =
    health.nozzleHealth.find((h) => h.status === "ACTIVE")?._count.status || 0;
  const nozzleTotal = health.nozzleHealth.reduce(
    (sum, h) => sum + h._count.status,
    0,
  );
  const nozzleHealthPercent =
    nozzleTotal > 0 ? Math.round((nozzleActive / nozzleTotal) * 100) : 0;

  const getStatusColor = (percent: number) => {
    if (percent >= 90) return "bg-green-500";
    if (percent >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pumps</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {pumpActive} / {pumpTotal} active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span className="font-medium">{pumpHealthPercent}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStatusColor(pumpHealthPercent)}`}
                    style={{ width: `${pumpHealthPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {pumpHealthPercent < 90 && (
              <div className="mt-3 flex items-center gap-2 text-sm text-amber-700">
                <AlertCircle className="h-4 w-4" />
                <span>Maintenance recommended</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Nozzles</CardTitle>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {nozzleActive} / {nozzleTotal} active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Plug className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span className="font-medium">{nozzleHealthPercent}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStatusColor(nozzleHealthPercent)}`}
                    style={{ width: `${nozzleHealthPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {nozzleHealthPercent < 90 && (
              <div className="mt-3 flex items-center gap-2 text-sm text-amber-700">
                <AlertCircle className="h-4 w-4" />
                <span>Check nozzles for issues</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
