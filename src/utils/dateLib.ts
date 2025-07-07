import { format } from "date-fns";

//format date to "dd/MM/yyyy"
export const formatDate = (date: Date): string => {
  return format(new Date(date), "dd/MM/yyyy");
};

// format data to 5th June, 2024
export function formatDateWithOrdinal(date: Date): string {
  const day = format(date, "d");
  const dayWithSuffix = getOrdinal(Number(day));
  const monthAndYear = format(date, "MMMM yyyy");
  return `${dayWithSuffix} ${monthAndYear}`;
}

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
