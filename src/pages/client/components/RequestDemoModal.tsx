import { useState } from "react";
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
import { Loader2, CheckCircle2 } from "lucide-react";

interface RequestDemoModalProps {
  open: boolean;
  onClose: () => void;
}

export function RequestDemoModal({ open, onClose }: RequestDemoModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    numberOfPumps: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.companyName || !form.email || !form.phone) {
      return alert("Please fill all required fields.");
    }

    try {
      setLoading(true);

      // 🔥 Replace with real API call
      await new Promise((res) => setTimeout(res, 1500));

      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      numberOfPumps: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="sm:max-w-lg w-[95%] max-h-[90vh] overflow-y-auto rounded-2xl">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Request a Live Demo
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                See how FuelMgt Pro can optimize your station operations.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 mt-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label>Station / Company Name *</Label>
                <Input
                  placeholder="ABC Fuel Station"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  placeholder="+234..."
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              {/* Pumps */}
              <div className="space-y-2">
                <Label>Number of Pumps</Label>
                <Input
                  type="number"
                  placeholder="e.g. 6"
                  value={form.numberOfPumps}
                  onChange={(e) =>
                    handleChange("numberOfPumps", e.target.value)
                  }
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Submitting...
                  </>
                ) : (
                  "Schedule My Demo"
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold">
              Demo Request Sent Successfully!
            </h3>
            <p className="text-gray-500 mt-2">
              Our team will contact you within 24 hours.
            </p>

            <Button
              className="mt-6 bg-green-500 hover:bg-green-600 text-black"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
