import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, UserPlus, ArrowLeft } from "lucide-react";
import GoogleAuthButton from "./GoogleAuthButton";
import { useRegister } from "@/hooks/auth/useRegister";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { errors, handleSubmit, isError, isPending, onSubmit, register } =
    useRegister();
  const navigate = useNavigate();
  console.log(errors);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Create Account
        </h2>
        <p className="text-slate-300">Join FuelStation Pro today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-200">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your full name"
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          {errors?.name && (
            <small className="text-red-400">{errors.name.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-slate-200">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="register-email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              // value={email}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500"
              // required
            />
          </div>
          {errors?.email && (
            <small className="text-red-400">{errors.email.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-slate-200">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="register-password"
              type="password"
              {...register("password")}
              placeholder="Create a password"
              // value={password}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500"
              // required
            />
          </div>
          {errors?.password && (
            <small className="text-red-400">{errors.password.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-slate-200">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="confirm-password"
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              // value={confirmPassword}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500"
              // required
            />
          </div>
          {errors?.confirmPassword && (
            <small className="text-red-400">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="rounded border-slate-600 bg-slate-800/50 text-orange-500 focus:ring-orange-500"
            required
          />
          <Label htmlFor="terms" className="text-sm text-slate-300">
            I agree to the{" "}
            <Button
              type="button"
              variant="link"
              className="text-orange-400 hover:text-orange-300 p-0 h-auto"
            >
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button
              type="button"
              variant="link"
              className="text-orange-400 hover:text-orange-300 p-0 h-auto"
            >
              Privacy Policy
            </Button>
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-colors duration-200"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating account...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
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

export default RegisterForm;
