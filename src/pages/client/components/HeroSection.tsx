import { motion } from "framer-motion";
import { fadeUp, stagger } from "../Index";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RequestDemoModal } from "./RequestDemoModal";

export function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center text-center px-6 pt-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Complete Fuel Station{" "}
            <span className="text-green-400">Management System</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-400 text-lg md:text-xl"
          >
            Manage pumps, nozzles, attendants, fuel inventory, sales, and
            expenses — all in one powerful platform built for modern fuel
            businesses.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex justify-center gap-4 flex-wrap"
          >
            <Button
              onClick={() => setOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-black px-6 py-6 text-lg"
            >
              🚀 Schedule a Live Demo
            </Button>
            {/* <Button
            variant="outline"
            className="px-6 py-6 text-lg border-gray-700 text-black"
          >
            Book Demo <ArrowRight className="ml-2" size={18} />
          </Button> */}
          </motion.div>
        </motion.div>
      </section>

      <RequestDemoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
