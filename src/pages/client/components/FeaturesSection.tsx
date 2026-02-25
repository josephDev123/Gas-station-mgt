/* =========================================================
   FEATURES (Based on Schema)
========================================================= */
import { motion } from "framer-motion";
import {
  ArrowRight,
  Fuel,
  BarChart3,
  Users,
  ShieldCheck,
  Activity,
  Wallet,
} from "lucide-react";
import { fadeUp, stagger } from "../Index";

export function FeaturesSection() {
  const features = [
    {
      icon: Fuel,
      title: "Fuel Inventory Management",
      desc: "Track PMS, Diesel, LPG and Gasoline volumes in real-time with automatic volume deductions.",
    },
    {
      icon: Activity,
      title: "Pump & Nozzle Control",
      desc: "Assign attendants to nozzles, monitor pump status (Active, Maintenance, Inactive).",
    },
    {
      icon: Users,
      title: "User & Role Management",
      desc: "Admin and Attendant role system with assignment tracking.",
    },
    {
      icon: Wallet,
      title: "Sales & Expense Tracking",
      desc: "Automatic sale calculation, revenue tracking, and expense monitoring.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      desc: "Real-time dashboards for profit, margin, fuel volume and performance insights.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      desc: "Built with enterprise-grade security and database consistency.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gray-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Everything You Need to Run a Fuel Station
        </motion.h2>

        <motion.div
          variants={stagger}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500 transition"
            >
              <feature.icon className="text-green-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
