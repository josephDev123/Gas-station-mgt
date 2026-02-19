export const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    num,
  );

export const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);
