import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import GenerateSite from "./pages/GenerateSite.tsx";
import BuildProgress from "./pages/BuildProgress.tsx";
import Generator from "./pages/Generator.tsx";
import Preview from "./pages/Preview.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/generate" element={<GenerateSite />} />
        <Route path="/build/:id" element={<BuildProgress />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
