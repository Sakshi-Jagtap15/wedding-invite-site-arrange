import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InvitePage from "./pages/InvitePage";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Dashboard FIRST */}
          <Route path="/dashboard/:slug" element={<Dashboard />} />
          {/* Invite page AFTER */}
          <Route path="/:slug" element={<InvitePage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
