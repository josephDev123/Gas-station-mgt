// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { persistor, store } from "./lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <TooltipProvider>
          <Sonner />
          <RouterProvider router={router} />
        </TooltipProvider>
        <Toaster position="top-right" />
      </Provider>
    </PersistGate>
  </QueryClientProvider>
);

export default App;
