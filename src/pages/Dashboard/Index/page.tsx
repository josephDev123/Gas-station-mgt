import { useDashboardData } from "./hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { SummaryCards } from "./components/SummaryCard";
import { SalesBySection } from "./components/SalesBySection";
import { FuelLevelCards } from "./components/FuelLevelCard";
import { HardwareHealth } from "./components/HardWareHealth";
import { ExpenseOverview } from "./components/ExpenseOverview";
import { MetricCard } from "./components/MetricCard";
import { formatCurrency, formatNumber } from "./util/formatNumber";
import { EmptyStateCard } from "./components/EmptyStateCard";
import { BarChart3, Fuel, Receipt } from "lucide-react";
import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./components/DateRangePicker";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize date range from URL or fallback to last 30 days
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    if (fromParam && toParam) {
      return {
        from: new Date(fromParam),
        to: new Date(toParam),
      };
    }

    // Default: last 30 days
    const today = new Date();
    return {
      from: subDays(today, 30),
      to: today,
    };
  });

  // Sync picker → URL (only when date actually changes)
  useEffect(() => {
    if (!date?.from) return;

    const fromStr = format(date.from, "yyyy-MM-dd");

    // If no 'to' selected (single day pick), use same day
    const toStr = date.to ? format(date.to, "yyyy-MM-dd") : fromStr;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("from", fromStr);
        next.set("to", toStr);
        return next;
      },
      { replace: true }, // optional: avoids adding to history stack on every keystroke
    );
  }, [date, setSearchParams]);
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(16)].map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }

  if (!data?.data) return null;

  const { summary, SalesBy, FuelLevelStatus, hardwareHealth, expenseOverview } =
    data.data;

  const hasSalesData =
    (SalesBy?.saleByUser?.length ?? 0) > 0 ||
    (SalesBy?.saleByFuelType?.length ?? 0) > 0;

  const hasFuelLevels = (FuelLevelStatus?.length ?? 0) > 0;
  const hasExpenses = (expenseOverview?.expenses?.byCategory?.length ?? 0) > 0;

  // Prepare chart data

  const fuelTypeData =
    SalesBy?.saleByFuelType?.map((item) => ({
      name: item.fuelType,
      Liters: Number(item.liters_sold),
      Revenue: Number(item.total_amount),
    })) ?? [];

  const avgPricePerLiter =
    summary.totalLitersSold > 0
      ? summary.totalRevenue / summary.totalLitersSold
      : 0;

  const margin =
    summary.totalRevenue > 0
      ? ((summary.totalRevenue - summary.totalExpenses) /
          summary.totalRevenue) *
        100
      : 0;

  return (
    <div className="container mx-auto space-y-8 py-6 px-0">
      <div className="flex lg:flex-row gap-3 flex-col lg:items-center justify-between">
        <h1 className="2xl:text-3xl text-2xl font-bold tracking-tight ">
          Fuel Station Dashboard
        </h1>
        <DateRangePicker date={date} onDateChange={setDate} />
        <Button
          variant="ghost"
          className="bg-red-200"
          onClick={() => {
            setSearchParams({});
            setDate(undefined);
          }}
        >
          Clear date range
        </Button>
      </div>

      {date?.from && (
        <span className="text-sm text-muted-foreground">
          Showing data from {format(date.from, "MMM d, yyyy")}
          {date.to && ` – ${format(date.to, "MMM d, yyyy")}`}
        </span>
      )}

      {/* KPI Summary Cards */}
      <SummaryCards summary={summary} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <h2 className="text-xl font-semibold mb-4">
            Tank / Fuel Stock Status
          </h2>
          {hasFuelLevels ? (
            <FuelLevelCards fuelLevels={FuelLevelStatus} />
          ) : (
            <EmptyStateCard
              message="No tank data available yet"
              icon={<Fuel className="h-10 w-10 text-muted-foreground" />}
            />
          )}
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Hardware Health</h2>
          <HardwareHealth
            health={hardwareHealth ?? { pumpHealth: [], nozzleHealth: [] }}
          />
        </div>
      </div>

      {/* Sales Breakdown */}
      {/* <SalesBySection salesBy={SalesBy} fuelTypeData={fuelTypeData} /> */}

      {hasSalesData ? (
        <SalesBySection salesBy={SalesBy} fuelTypeData={fuelTypeData} />
      ) : (
        <EmptyStateCard
          message="No sales recorded yet"
          icon={<BarChart3 className="h-10 w-10 text-muted-foreground" />}
        />
      )}

      {/* Expenses */}
      {/* <ExpenseOverview expenses={expenseOverview.expenses} /> */}

      {hasExpenses ? (
        <ExpenseOverview expenses={expenseOverview.expenses} />
      ) : (
        <EmptyStateCard
          message="No expenses recorded yet"
          icon={<Receipt className="h-10 w-10 text-muted-foreground" />}
        />
      )}

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Avg Price/Liter"
          value={formatCurrency(avgPricePerLiter)}
          unit=""
        />
        <MetricCard title="Margin %" value={`${Math.round(margin)}%`} />
        <MetricCard
          title="Transactions"
          value={formatNumber(summary.totalSalesCount)}
        />
        <MetricCard
          title="Net Profit"
          value={formatCurrency(summary.netProfit)}
          className="bg-green-50/50 border-green-200"
        />
      </div>
    </div>
  );
}
