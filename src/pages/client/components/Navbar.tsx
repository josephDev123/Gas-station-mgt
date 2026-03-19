import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const session = useAppSelector((state) => state.user);
  console.log(session);
  const navigate = useNavigate();

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
          {/* <a href="#pricing" className="hover:text-white">
            Pricing
          </a> */}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* {session.id ? (
            <Button
              onClick={() => navigate("dashboard")}
              variant="ghost"
              className="text-gray-400 hover:text-blue-600"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => navigate("auth?auth_type=login")}
              variant="ghost"
              className="text-gray-400 hover:text-blue-600"
            >
              Login
            </Button>
          )} */}
          <Button className="bg-green-500 hover:bg-green-600 text-black">
            <a href="#requestDemo">Get Started</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
