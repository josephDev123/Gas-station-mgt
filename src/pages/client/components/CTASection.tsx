import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RequestDemoModal } from "./RequestDemoModal";

export function CTASection() {
  const [open, setOpen] = useState(false);
  return (
    <section id="requestDemo" className="py-24 px-6 text-center bg-black">
      <h2 className="text-3xl md:text-4xl font-bold">
        Ready to Modernize Your Fuel Business?
      </h2>
      <p className="text-gray-400 mt-4">
        Automate sales, monitor pumps, control expenses, and increase profits.
      </p>

      <Button
        onClick={() => setOpen(true)}
        className="mt-8 bg-green-500 hover:bg-green-600 text-black px-8 py-6 text-lg"
      >
        🚀 Request a Demo
      </Button>

      <RequestDemoModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
