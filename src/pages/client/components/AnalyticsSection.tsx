export function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Real-Time Revenue & Margin Tracking
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Automatic total price calculation per sale. Smart profit margin
          insights. Track volume left per pump and detect discrepancies
          instantly.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <StatCard title="Total Sales" value="₦24.5M" />
          <StatCard title="Fuel Volume Sold" value="124,000L" />
          <StatCard title="Profit Margin" value="18%" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-green-400">{value}</h3>
    </div>
  );
}
