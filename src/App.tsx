import React, { createContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Auth from "./pages/Auth";
import Mitigation from "./pages/Mitigation";
import PublicAwareness from "./pages/PublicAwareness";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

// Firebase
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Create Firebase Context
interface FirebaseContextType {
  db: ReturnType<typeof getFirestore>;
  auth: ReturnType<typeof getAuth>;
  storage: ReturnType<typeof getStorage>;
}

export const FirebaseContext = createContext<FirebaseContextType>({
  db: getFirestore(app),
  auth: getAuth(app),
  storage: getStorage(app),
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return (
    <FirebaseContext.Provider value={{ db, auth, storage }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<Report />} />
              <Route path="/mitigation" element={<Mitigation />} />
              <Route path="/awareness" element={<PublicAwareness />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
