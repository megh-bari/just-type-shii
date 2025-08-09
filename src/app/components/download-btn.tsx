"use client";

import { Download, ChevronDown, Copy, ImageIcon, Link as LinkIcon, FileImage } from "lucide-react";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { useState, useRef, useEffect } from "react";

interface DownloadButtonProps {
  text: string;
  isDark: boolean;
  showControls: boolean;
  onCopyLink?: () => void;
}

export function DownloadButton({ text, isDark, showControls, onCopyLink }: DownloadButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generateImage = async () => {
    if (!text.trim()) {
      console.log("No text to process");
      return null;
    }

    try {
      const target = document.querySelector(".min-h-screen") as HTMLElement | null;
      if (!target) {
        console.error("No capture target found");
         return null;
      }

      const filter = (node: HTMLElement) => {
        if (node.classList && node.classList.contains('screenshot-exclude')) return false;
        const classAttr = node.getAttribute && node.getAttribute('class');
        if (classAttr && classAttr.split(' ').includes('screenshot-exclude')) return false;
        return true;
      }

      const dataUrl = await toPng(target, {
        backgroundColor: isDark ? "#000000" : "#ffffff",
        cacheBust: true,
        pixelRatio: 2,
        filter: filter,
      });

      return dataUrl;
    } catch (error) {
      console.error("Image generation failed:", error);
      return null;
    }
  };

  const generateJpeg = async () => {
    try {
      const target = document.querySelector(".min-h-screen") as HTMLElement | null;
      if (!target) return null;
      const filter = (node: HTMLElement) => {
        if (node.classList && node.classList.contains('screenshot-exclude')) return false;
        const classAttr = node.getAttribute && node.getAttribute('class');
        if (classAttr && classAttr.split(' ').includes('screenshot-exclude')) return false;
        return true;
      }
      return await toJpeg(target, {
        quality: 0.92,
        backgroundColor: isDark ? "#000000" : "#ffffff",
        cacheBust: true,
        pixelRatio: 2,
        filter,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const generateSvg = async () => {
    try {
      const target = document.querySelector(".min-h-screen") as HTMLElement | null;
      if (!target) return null;
      const filter = (node: HTMLElement) => {
        if (node.classList && node.classList.contains('screenshot-exclude')) return false;
        const classAttr = node.getAttribute && node.getAttribute('class');
        if (classAttr && classAttr.split(' ').includes('screenshot-exclude')) return false;
        return true;
      }
      return await toSvg(target, {
        cacheBust: true,
        filter,
        pixelRatio: 2,
        backgroundColor: isDark ? "#000000" : "#ffffff",
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `just-type-shii-${new Date().toISOString().split("T")[0]}.png`;
    a.click();

    console.log("Screenshot downloaded successfully");
    setIsDropdownOpen(false);
  };

  const handleDownloadJpeg = async () => {
    const dataUrl = await generateJpeg();
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `just-type-shii-${new Date().toISOString().split("T")[0]}.jpg`;
    a.click();
    setIsDropdownOpen(false);
  }

  const handleDownloadSvg = async () => {
    const dataUrl = await generateSvg();
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `just-type-shii-${new Date().toISOString().split("T")[0]}.svg`;
    a.click();
    setIsDropdownOpen(false);
  }

  const handleCopyImage = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      console.log("Image copied to clipboard successfully");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Copy to clipboard failed:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems = [
    {
      icon: ImageIcon,
      label: "Save PNG",
      action: handleDownload,
    },
    {
      icon: FileImage,
      label: "Save JPEG",
      action: handleDownloadJpeg,
    },
    {
      icon: ImageIcon,
      label: "Save SVG",
      action: handleDownloadSvg,
    },
    {
      icon: Copy,
      label: "Copy Image",
      action: handleCopyImage,
    },
    {
      icon: LinkIcon,
      label: "Copy share link",
      action: () => { onCopyLink?.(); setIsDropdownOpen(false); },
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className={`fixed top-6 right-20 z-50 transition-all duration-300 ${
        showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="relative">
        <button
          onClick={toggleDropdown}
          disabled={!text.trim()}
          className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
            isDark
              ? "bg-black border-neutral-800 text-white hover:bg-[#181818] disabled:opacity-30 disabled:cursor-not-allowed"
              : "bg-white border-gray-200 text-black hover:bg-gray-100/60 disabled:opacity-30 disabled:cursor-not-allowed"
          }`}
          aria-label="Export options"
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
        >
          <Download className="h-4 w-4" />
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isDropdownOpen && (
          <div
            className={`absolute top-full mt-2 right-0 min-w-[200px] rounded-lg border backdrop-blur-sm shadow-lg overflow-hidden ${
              isDark
                ? "bg-black/90 border-neutral-800"
                : "bg-white/90 border-gray-200"
            }`}
            role="menu"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${
                  isDark
                    ? "text-white hover:bg-neutral-800/50"
                    : "text-black hover:bg-gray-100/50"
                }`}
                role="menuitem"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium flex-1 text-left">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
