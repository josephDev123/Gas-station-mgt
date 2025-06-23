
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-fade-in">
            ⛽ Professional Gas Station Management
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
            Complete{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Management System
            </span>{" "}
            for Your Gas Station
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Professional software solution designed specifically for gas station operations. 
            Manage customers, pumps, employees, fuel inventory, sales tracking, and generate 
            comprehensive reports—all integrated into one powerful system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              Request Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50 group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              View Features
            </Button>
          </div>
          
          <div className="relative max-w-4xl mx-auto animate-fade-in">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
                alt="Gas Station Management System Dashboard"
                className="w-full rounded-2xl shadow-2xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-20" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
