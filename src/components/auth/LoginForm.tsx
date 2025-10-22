import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, ArrowLeft, EyeClosed, Eye } from "lucide-react";
import GoogleAuthButton from "./GoogleAuthButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";

interface LoginFormProps {
  onForgotPassword: () => void;
}
const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    HandleRememberMe,
    remember,
    isPending,
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useLogin();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
        <p className="text-slate-300">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-200">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          {errors?.email && (
            <small className="text-red-400">{errors.email.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-200">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500"
              required
            />
            {isPasswordVisible && (
              <EyeClosed
                onClick={() => setIsPasswordVisible(false)}
                className="absolute right-3 top-3 w-4 h-4 text-slate-400 cursor-pointer"
              />
            )}
            {!isPasswordVisible && (
              <Eye
                onClick={() => setIsPasswordVisible(true)}
                className="absolute right-3 top-3 w-4 h-4 text-slate-400 cursor-pointer"
              />
            )}
          </div>
          {errors?.password && (
            <small className="text-red-400">{errors.password.message}</small>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              checked={remember}
              onChange={HandleRememberMe}
              type="checkbox"
              id="remember"
              className="rounded border-slate-600 bg-slate-800/50 text-orange-500 focus:ring-orange-500"
            />
            <Label htmlFor="remember" className="text-sm text-slate-300">
              Remember me
            </Label>
          </div>
          <Button
            type="button"
            variant="link"
            className="text-orange-400 hover:text-orange-300 p-0 h-auto"
            onClick={onForgotPassword}
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-colors duration-200"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </div>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-slate-800/50 px-4 text-slate-400">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleAuthButton />
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/")}
        className="w-full bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
    </div>
  );
};

export default LoginForm;
