import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Kontakt from "./components/Kontact";
import Pravidla from "./components/Pravidla";
import Napoveda from "./components/Napoveda";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/pravidla" element={<Pravidla />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/napoveda" element={<Napoveda />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
