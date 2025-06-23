
import { CheckCircle, Clock, DollarSign, Shield } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Streamline Daily Operations",
      description: "Automate routine tasks and integrate all management functions to save time and reduce errors.",
      stats: "50% faster operations"
    },
    {
      icon: DollarSign,
      title: "Optimize Business Performance",
      description: "Track sales, manage inventory efficiently, and identify opportunities to increase profitability.",
      stats: "Better profit margins"
    },
    {
      icon: Shield,
      title: "Maintain Compliance & Security",
      description: "Stay compliant with industry regulations and keep your business data secure and organized.",
      stats: "Industry compliant"
    }
  ];

  const keyFeatures = [
    "Comprehensive inventory management",
    "Employee scheduling and tracking",
    "Real-time sales monitoring",
    "Automated reporting system",
    "Customer database management",
    "Fuel level monitoring and alerts"
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Gas Station Management System?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed specifically for gas station operators who need reliable, 
              comprehensive management tools to run their business efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                
                <div className="text-blue-600 font-semibold text-lg">
                  {benefit.stats}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Complete Management Solution
                </h3>
                <p className="text-gray-600 mb-6">
                  Everything you need to manage your gas station operations efficiently, 
                  all integrated into one comprehensive system.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Gas Station Management Dashboard Interface"
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
