export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-12 mt-16 text-left">
          <Step
            number="01"
            title="Register Fuel & Pumps"
            desc="Add fuel types, set price per litre, and connect them to pumps."
          />
          <Step
            number="02"
            title="Assign Attendants"
            desc="Assign attendants to nozzles and track every sale."
          />
          <Step
            number="03"
            title="Monitor & Analyze"
            desc="Track revenue, expenses, margins, and fuel performance in real-time."
          />
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, desc }: any) {
  return (
    <div>
      <div className="text-green-400 text-lg font-bold">{number}</div>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-gray-400 mt-2 text-sm">{desc}</p>
    </div>
  );
}
