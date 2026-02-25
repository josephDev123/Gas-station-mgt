import { Button } from "@/components/ui/button";
import { Fuel } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2">
          <Fuel className="text-green-400" />
          gas.josephdev
        </div>

        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#analytics" className="hover:text-white">
            Analytics
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
        </div>

        <Button className="bg-green-500 hover:bg-green-600 text-black">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
