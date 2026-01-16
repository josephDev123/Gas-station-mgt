import CreateExpenseSection from "./components/CreateExpenseSection";

export default function page() {
  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Station Expenses</h1>
        <p className="text-gray-600 text-sm">
          Record and monitor all operational expenses incurred at the station,
          including fuel purchases, maintenance costs, utilities, logistics, and
          other day-to-day spending to maintain accurate financial records.
        </p>
      </section>
      <section className="flex flex-col">
        <CreateExpenseSection />
      </section>
    </main>
  );
}
