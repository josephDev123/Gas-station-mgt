import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Fuel,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Zap,
  Droplet,
} from "lucide-react";
import { formatNumber, formatCurrency } from "../util/formatNumber";
import { type DashboardData } from "../types/IDashboard";

type Props = {
  summary: DashboardData["summary"];
};

export function SummaryCards({ summary }: Props) {
  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(summary.totalRevenue),
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      trend: "+12.5%", // you can make dynamic later
      trendUp: true,
    },
    {
      title: "Liters Sold",
      value: formatNumber(summary.totalLitersSold) + " L",
      icon: <Fuel className="h-5 w-5 text-blue-600" />,
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Net Profit",
      value: formatCurrency(summary.netProfit),
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      trend: "+15.3%",
      trendUp: true,
    },
    {
      title: "Total Expenses",
      value: formatCurrency(summary.totalExpenses),
      icon: <TrendingDown className="h-5 w-5 text-red-600" />,
      trend: "+4.1%",
      trendUp: false,
    },
    {
      title: "Transactions",
      value: formatNumber(summary.totalSalesCount),
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      trend: null,
    },
    {
      title: "Active Pumps",
      value: summary.activePumps.toString(),
      icon: <Zap className="h-5 w-5 text-amber-600" />,
      trend: null,
    },
    {
      title: "Active Nozzles",
      value: summary.activeNozzles.toString(),
      icon: <Droplet className="h-5 w-5 text-cyan-600" />,
      trend: null,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className="rounded-full bg-muted/30 p-2">{card.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.trend && (
                <p className="text-xs mt-1 flex items-center gap-1">
                  {card.trendUp ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span
                    className={card.trendUp ? "text-green-600" : "text-red-600"}
                  >
                    {card.trend}
                  </span>
                  <span className="text-muted-foreground">vs yesterday</span>
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
