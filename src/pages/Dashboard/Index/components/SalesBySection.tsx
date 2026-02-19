import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatCurrency } from "../util/formatNumber";
import { type DashboardData } from "../types/IDashboard";

type Props = {
  salesBy: DashboardData["SalesBy"];
  fuelTypeData: Array<{ name: string; Liters: number; Revenue: number }>;
};

export function SalesBySection({ salesBy, fuelTypeData }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Fuel Type Performance - Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Fuel Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fuelTypeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number, name: string) =>
                    name === "Revenue"
                      ? formatCurrency(value)
                      : formatNumber(value)
                  }
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="Liters"
                  fill="#3b82f6"
                  name="Liters Sold"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="Revenue"
                  fill="#10b981"
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Small summary table below chart */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Fuel Type</th>
                  <th className="text-right py-2">Liters Sold</th>
                  <th className="text-right py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesBy.saleByFuelType.map((item) => (
                  <tr key={item.fuelType} className="border-b last:border-none">
                    <td className="py-3">{item.fuelType}</td>
                    <td className="text-right py-3">
                      {formatNumber(Number(item.liters_sold))}
                    </td>
                    <td className="text-right py-3 font-medium">
                      {formatCurrency(Number(item.total_amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendants / Users Table - kept simple */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Attendant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Attendant</th>
                  <th className="text-right py-2">Liters Sold</th>
                  <th className="text-right py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesBy.saleByUser.map((user) => (
                  <tr key={user.user_id} className="border-b last:border-none">
                    <td className="py-3">{user.user_name}</td>
                    <td className="text-right py-3">
                      {formatNumber(Number(user.liters_sold))}
                    </td>
                    <td className="text-right py-3 font-medium">
                      {formatCurrency(Number(user.total_amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
