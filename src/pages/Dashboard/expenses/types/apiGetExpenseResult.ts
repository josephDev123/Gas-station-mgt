export interface ReceiptUrlMetadata {
  public_id: string;
  secure_url: string;
  resource_type: string;
}

export interface Expense {
  id: number;
  description: string;
  category: string;
  amount: string; // string because API returns it as "100"
  receiptUrl: string;
  receiptUrlMetadata: ReceiptUrlMetadata;
}

export type ExpenseData = {
  expenses: Expense[];
  totalCount: number;
  page: number;
};

export interface GetExpensesResponse {
  msg: string;
  data: ExpenseData;
}
