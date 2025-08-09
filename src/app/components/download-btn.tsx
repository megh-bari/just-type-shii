"use client";

import { Download } from "lucide-react";
import html2canvas from "html2canvas-pro";

interface DownloadButtonProps {
  text: string;
  isDark: boolean;
  showControls: boolean;
}

export function DownloadButton({ text, isDark, showControls }: DownloadButtonProps) {
  const handleDownload = async () => {
    if (!text.trim()) {
      console.log("No text to download");
      return;
    }

    try {
      const hideElements = document.querySelectorAll<HTMLElement>("[data-hide-for-screenshot]");
      hideElements.forEach(el => (el.style.visibility = "hidden"));

      const target = document.querySelector(".min-h-screen") as HTMLElement | null;
      if (!target) {
        console.error("No capture target found");
        hideElements.forEach(el => (el.style.visibility = "visible"));
        return;
      }

      const canvas = await html2canvas(target, {
        backgroundColor: isDark ? "#000000" : "#ffffff",
        scale: 2,
      });

      hideElements.forEach(el => (el.style.visibility = "visible"));

      const imageUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = `just-type-shii-${new Date().toISOString().split("T")[0]}.png`;
      a.click();

      console.log("Screenshot downloaded successfully");
    } catch (error) {
      console.error("Screenshot failed:", error);
    }
  };

  return (
    <div
      className={`fixed top-6 right-20 z-50 transition-all duration-300 ${
        showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      data-hide-for-screenshot
    >
      <button
        onClick={handleDownload}
        disabled={!text.trim()}
        className={`w-10 h-10 cursor-pointer rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center justify-center ${
          isDark
            ? "bg-black border-neutral-800 text-white hover:bg-[#181818] disabled:opacity-30 disabled:cursor-not-allowed"
            : "bg-white border-gray-300 text-black hover:bg-gray-100/60 disabled:opacity-30 disabled:cursor-not-allowed"
        }`}
        aria-label="Download screenshot"
      >
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
}
