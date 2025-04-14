
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataUpload from "./pages/DataUpload";
import Experiment from "./pages/Experiment";
import Visualization from "./pages/Visualization";
import Pipeline from "./pages/Pipeline";
import Database from "./pages/Database";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data-upload" element={<DataUpload />} />
          <Route path="/experiment" element={<Experiment />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/database" element={<Database />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
