import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      <header className="px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-white font-semibold">Calibrated Communication</span>
          </div>
          <Link to="/generator" className="text-slate-400 text-sm hover:text-white transition-colors">
            Dashboard →
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4">Build websites in minutes</h1>
          <p className="text-slate-300 text-lg mb-8">
            Generate beautiful, functional websites for local service businesses with AI.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/generate"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-white font-semibold transition-colors"
            >
              Start Building
            </Link>
            <Link
              to="/generator"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
