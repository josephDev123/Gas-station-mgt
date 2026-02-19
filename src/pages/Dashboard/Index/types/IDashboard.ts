export interface DashboardData {
  summary: {
    totalRevenue: number;
    totalLitersSold: number;
    totalExpenses: number;
    netProfit: number;
    totalSalesCount: number;
    activePumps: number;
    activeNozzles: number;
  };
  SalesBy: {
    saleByUser: Array<{
      user_id: number;
      user_name: string;
      liters_sold: string;
      total_amount: string;
    }>;
    saleByFuelType: Array<{
      fuelType: string;
      liters_sold: string;
      total_amount: string;
    }>;
  };
  FuelLevelStatus: Array<{
    id: number;
    name: string;
    fuelType: string;
    fuelVolume: number;
    volumeLeft: number | null;
    unit: string;
    price_per: number;
    status: "OK" | "LOW" | "CRITICAL" | "EMPTY";
  }>;
  hardwareHealth: {
    pumpHealth: Array<{ status: string; _count: { status: number } }>;
    nozzleHealth: Array<{ status: string; _count: { status: number } }>;
  };
  expenseOverview: {
    expenses: {
      total: number;
      byCategory: Array<{ category: string; amount: number }>;
      recentExpenses: Array<{
        id: number;
        description: string;
        category: string;
        amount: number;
        createdAt: string;
      }>;
    };
  };
}

export interface ApiResponse {
  msg: string;
  data: DashboardData;
}
