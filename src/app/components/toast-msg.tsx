import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastMsg() {
  useEffect(() => {
    toast.custom(() => (
      <div
        onClick={() => window.open("https://patterncraft.fun", "_blank")}
        className="group cursor-pointer relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl p-5 shadow-2xl hover:bg-black/40 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative flex items-center justify-center gap-3 text-center">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/30"></div>
          
          <div className="text-white/90 text-sm font-light tracking-wide">
            Need beautiful backgrounds?{" "}
            <span className="text-white font-medium border-b border-white/20 hover:border-white/40 transition-colors duration-300">
              patterncraft.fun
            </span>
          </div>
        </div>
      </div>
    ), {
      duration: 6000,
      position: "top-center"
    });
  }, []);

  return null;
}