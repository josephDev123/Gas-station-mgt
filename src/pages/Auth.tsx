import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { Fuel } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const Auth = () => {
  const [activeForm, setActiveForm] = useState<
    "login" | "register" | "forgot-password"
  >("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-500 p-3 rounded-full">
              <Fuel className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            FuelStation Pro
          </h1>
          <p className="text-slate-300">
            Complete Gas Station Management System
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Form Toggle - Only show for login and register */}
          {activeForm !== "forgot-password" && (
            <div className="flex bg-slate-800/50 rounded-lg p-1 mb-6">
              <Button
                variant={activeForm === "login" ? "default" : "ghost"}
                className={`flex-1 ${
                  activeForm === "login"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveForm("login")}
              >
                Login
              </Button>
              <Button
                variant={activeForm === "register" ? "default" : "ghost"}
                className={`flex-1 ${
                  activeForm === "register"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveForm("register")}
              >
                Register
              </Button>
            </div>
          )}

          {/* Forms */}
          {activeForm === "login" && (
            <LoginForm
              onForgotPassword={() => setActiveForm("forgot-password")}
            />
          )}
          {activeForm === "register" && <RegisterForm />}
          {activeForm === "forgot-password" && (
            <ForgotPasswordForm onBack={() => setActiveForm("login")} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>Secure • Reliable • Professional</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
