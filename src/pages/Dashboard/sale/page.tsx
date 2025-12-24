import CreateSales from "./components/CreateSales";

export default function SalePage() {
  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Fuel Sales Records</h1>
        <p className="text-gray-600 text-sm">
          View and track all fuel sales transactions, including pump and nozzle
          details, fuel type, price per liter, volume sold, total amount, and
          the attendant responsible for each sale.
        </p>
      </section>
      <CreateSales />
    </main>
  );
}
