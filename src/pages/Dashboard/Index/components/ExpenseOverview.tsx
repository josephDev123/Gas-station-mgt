import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { type DashboardData } from "../types/IDashboard";
import { formatCurrency } from "../util/formatNumber";

type Props = {
  expenses: DashboardData["expenseOverview"]["expenses"];
};

export function ExpenseOverview({ expenses }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ExpenseBreakdownChart
        byCategory={expenses.byCategory}
        total={expenses.total}
      />

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.recentExpenses.map((exp) => (
              <div
                key={exp.id}
                className="flex justify-between items-start border-b pb-3 last:border-none"
              >
                <div>
                  <p className="font-medium">{exp.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">
                    {formatCurrency(exp.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(exp.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
