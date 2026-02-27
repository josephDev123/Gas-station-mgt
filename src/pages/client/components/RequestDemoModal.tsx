import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateRequestSchema,
  ICreateRequestSchema,
} from "../schema/createRequestDemoSchema";
import { useMutateAction } from "@/hooks/useMutation";
import { CreateRequestDemoResponse } from "../types/ICreateReqestApiResponse";
import { toast } from "sonner";

interface RequestDemoModalProps {
  open: boolean;
  onClose: () => void;
}

export function RequestDemoModal({ open, onClose }: RequestDemoModalProps) {
  const { mutate, isPending } = useMutateAction<
    CreateRequestDemoResponse,
    ICreateRequestSchema
  >("post", "/request-demo/create");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ICreateRequestSchema>({
    resolver: zodResolver(CreateRequestSchema),
    defaultValues: {
      companyName: "",
      email: "",
      fullName: "",
      message: "",
      phoneNumber: "",
    },
  });

  const handleSubmitRequestDemo: SubmitHandler<ICreateRequestSchema> = async (
    data,
  ) => {
    mutate(data, {
      onError: (error) => {
        toast.error(
          error.message ?? "Failed to create Request Demo. Try again later",
        );
      },

      onSuccess: (data) => {
        toast.success(
          data.message ??
            "Request demo created successfully. We will contact you shortly.",
        );
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg w-[95%] max-h-[90vh] overflow-y-auto rounded-2xl
bg-slate-900 text-white border border-slate-800 shadow-2xl"
      >
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Request a Live Demo
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              See how gas.josephdev can optimize your station operations.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleSubmitRequestDemo)}
            className="grid gap-5 mt-6"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                placeholder="John Doe"
                {...register("fullName")}
              />
              {errors?.fullName && (
                <small className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </small>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label>Station / Company Name *</Label>
              <Input
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                placeholder="ABC Fuel Station"
                {...register("companyName")}
              />

              {errors?.companyName && (
                <small className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </small>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />

              {errors?.email && (
                <small className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </small>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                placeholder="+234..."
                {...register("phoneNumber")}
              />

              {errors?.phoneNumber && (
                <small className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </small>
              )}
            </div>

            {/* Pumps */}
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-green-500"
                placeholder="e.g. 6"
                rows={5}
                {...register("message")}
              />

              {errors?.message && (
                <small className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </small>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 shadow-lg shadow-green-900/40"
            >
              Schedule My Demo
              {isPending && <Loader2 className="animate-spin mr-2" size={18} />}
            </Button>
          </form>
        </>
      </DialogContent>
    </Dialog>
  );
}
