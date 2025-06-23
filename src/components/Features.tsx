
import { 
  Users, 
  Fuel, 
  UserCheck, 
  BarChart3, 
  ShoppingCart, 
  TrendingUp, 
  FileText, 
  Settings 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Customer Management",
      description: "Track customer information, loyalty programs, and purchase history for better service and retention."
    },
    {
      icon: Settings,
      title: "Pump Management",
      description: "Monitor pump status, fuel levels, and maintenance schedules to ensure optimal operations."
    },
    {
      icon: UserCheck,
      title: "Employee Management",
      description: "Manage staff schedules, track performance, and handle payroll with integrated HR tools."
    },
    {
      icon: Fuel,
      title: "Fuel Management",
      description: "Monitor fuel inventory, track deliveries, and manage supplier relationships efficiently."
    },
    {
      icon: ShoppingCart,
      title: "Sales Records",
      description: "Comprehensive sales tracking with real-time transaction monitoring and receipt management."
    },
    {
      icon: TrendingUp,
      title: "Expense Tracking",
      description: "Track all operational expenses, categorize costs, and maintain detailed financial records."
    },
    {
      icon: FileText,
      title: "Reports & Analysis",
      description: "Generate detailed reports and analytics to make data-driven business decisions."
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Advanced analytics dashboard with insights into profitability and operational efficiency."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Gas Station
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you streamline operations, 
            increase efficiency, and boost profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-white"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
