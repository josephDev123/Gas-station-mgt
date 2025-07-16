import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { isAuthenticated } from "@/utils/isUserAuthenticated";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const isAuth = isAuthenticated(user);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-8 h-8  flex items-center justify-center">
              {/* <span className="text-white font-bold text-sm">GS</span> */}
              <img src="./logo.png" alt="Logo" className="rounded-md" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">
              GasStation Pro
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Benefits
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
              <Button
                onClick={() => navigate("dashboard")}
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => navigate("auth?auth_type=login")}
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </Button>
            )}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Request Demo
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Benefits
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                {isAuth ? (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("dashboard")}
                    className="w-full text-gray-600 hover:text-blue-600"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("auth?auth_type=login")}
                    className="w-full text-gray-600 hover:text-blue-600"
                  >
                    Login
                  </Button>
                )}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Request Demo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
