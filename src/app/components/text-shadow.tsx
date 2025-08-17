"use client";

import { Slider } from "@/components/ui/slider";
import { Blend } from "lucide-react";
import { useState } from "react";

interface TextShadowSettings {
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
}

interface TextShadowPickerProps {
  value: TextShadowSettings;
  onChange: (newShadow: TextShadowSettings) => void;
  isDark?: boolean;
}

export function TextShadowPicker({ value, onChange, isDark = false }: TextShadowPickerProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (field: keyof TextShadowSettings, val: number | string) => {
    const newShadow = { ...value, [field]: val };
    onChange(newShadow);
  };

  const handleStepperChange = (field: keyof TextShadowSettings, increment: number) => {
    const currentValue = value[field] as number;
    let newValue = currentValue + increment;
    
    // set's bounds for different fields
    if (field === 'opacity') {
      newValue = Math.max(0, Math.min(1, newValue));
    } else if (field === 'blur') {
      newValue = Math.max(0, newValue);
    }
    
    handleChange(field, newValue);
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const shadowCss = `${value.x}px ${value.y}px ${value.blur}px ${hexToRgba(value.color, value.opacity)}`;

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`
          flex items-center justify-between gap-3 px-4 py-3 w-full border cursor-pointer
          transition-all duration-200 backdrop-blur-sm
          ${open ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}
          ${isDark
            ? "bg-black border-neutral-800 text-white hover:bg-neutral-900"
            : "bg-white border-neutral-300 text-black hover:bg-neutral-100 shadow-lg"
          }
        `}
      >
        <div className=" flex justify-center items-center gap-x-2 font-medium">
          <Blend className="w-5 h-5 "/>
          Text Shadow</div>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          ${isDark ? "bg-black border-x border-b border-neutral-800 text-white" : "bg-white border-x border-b border-neutral-300 text-black"}
          backdrop-blur-sm shadow-xl rounded-b-2xl p-4 space-y-4
        `}
      >
 
 
        <div className="space-y-2">
          <label className="text-sm font-medium block">Horizontal ({value.x}px)</label>
          <Slider
            value={[value.x]}
            onValueChange={(val) => handleChange("x", val[0])}
            min={-20}
            max={20}
            step={1}
          />
        </div>


        <div className="space-y-2">
          <label className="text-sm font-medium block">Vertical ({value.y}px)</label>
          <Slider
            value={[value.y]}
            onValueChange={(val) => handleChange("y", val[0])}
            min={-20}
            max={20}
            step={1}
          />
        </div>

  
        <div className="space-y-2">
          <label className="text-sm font-medium block">Blur ({value.blur}px)</label>
          <Slider
            value={[value.blur]}
            onValueChange={(val) => handleChange("blur", val[0])}
            min={0}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium block">Shadow Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={value.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="w-12 h-8 rounded-md border-0 cursor-pointer"
            />
            <span className="text-sm font-mono">{value.color}</span>
          </div>
        </div>

        
        <div className="space-y-2">
          <label className="text-sm font-medium block">
            Opacity ({Math.round(value.opacity * 100)}%)
          </label>
          <Slider
            value={[value.opacity]}
            onValueChange={(val) => handleChange("opacity", val[0])}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}