import { useState } from "react";
import { Sun, Moon, Palette, Pipette, Type, Settings, X } from "lucide-react";
import {
  useTheme,
  type ThemeAccent,
  type ThemeTypography,
  type ThemeVariant,
} from "../../context";
import { Select } from "../../components/ui/Select/Select";
import "./ThemeControls.css";

const variantOptions: { value: string; label: string }[] = [
  { value: "zinc", label: "Zinc" },
  { value: "slate", label: "Slate" },
  { value: "stone", label: "Stone" },
  { value: "gray", label: "Gray" },
  { value: "neutral", label: "Neutral" },
];

const typographyOptions: {
  value: string;
  label: string;
  style?: React.CSSProperties;
}[] = [
  {
    value: "system",
    label: "System",
    style: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
  },
  {
    value: "modern",
    label: "Modern",
    style: { fontFamily: "'Inter', sans-serif" },
  },
  {
    value: "geometric",
    label: "Geometric",
    style: { fontFamily: "'Space Grotesk', sans-serif" },
  },
  {
    value: "editorial",
    label: "Editorial",
    style: { fontFamily: "'Playfair Display', serif" },
  },
];

const accents: { value: ThemeAccent; color: string }[] = [
  { value: "blue", color: "#3b82f6" },
  { value: "red", color: "#ef4444" },
  { value: "green", color: "#22c55e" },
  { value: "orange", color: "#f97316" },
  { value: "violet", color: "#8b5cf6" },
  { value: "rose", color: "#f43f5e" },
];

export function ThemeControls() {
  const [isMinimized, setIsMinimized] = useState(true);
  const {
    resolvedMode,
    variant,
    accent,
    typography,
    setMode,
    setVariant,
    setAccent,
    setTypography,
  } = useTheme();

  return (
    <div className="theme-controls" data-minimized={isMinimized || undefined}>
      {/* Header: Mode Toggle + Close Button */}
      <div className="theme-controls__header">
        {/* Close/Open Toggle */}
        <button
          className="theme-controls__toggle"
          onClick={() => setIsMinimized(!isMinimized)}
          title={isMinimized ? "Open theme controls" : "Close theme controls"}
          aria-label={
            isMinimized ? "Open theme controls" : "Close theme controls"
          }
          aria-expanded={!isMinimized}
        >
          {isMinimized ? <Settings size={18} /> : <X size={16} />}
        </button>
        {/* Mode Toggle - circular button */}
        <button
          className="theme-controls__mode-btn"
          onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
          title={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
          aria-label="Toggle theme mode"
        >
          {resolvedMode === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>

      {/* Panel Content */}
      <div className="theme-controls__panel">
        {/* Typography Select */}
        <div className="theme-controls__group">
          <Type size={14} className="theme-controls__icon" />
          <Select
            options={typographyOptions}
            value={typography}
            onValueChange={(val) => setTypography(val as ThemeTypography)}
            sideOffset={12}
            size="sm"
            className="theme-controls__select"
          />
        </div>

        <div className="theme-controls__divider" />

        {/* Variant Select */}
        <div className="theme-controls__group">
          <Palette size={14} className="theme-controls__icon" />
          <Select
            options={variantOptions}
            value={variant}
            onValueChange={(val) => setVariant(val as ThemeVariant)}
            sideOffset={12}
            size="sm"
            className="theme-controls__select"
          />
        </div>

        <div className="theme-controls__divider" />

        {/* Accent Colors */}
        <div className="theme-controls__group">
          <Pipette size={14} className="theme-controls__icon" />
          <div className="theme-controls__swatches">
            {accents.map((a) => (
              <button
                key={a.value}
                className="theme-controls__swatch"
                style={{ "--swatch-color": a.color } as React.CSSProperties}
                onClick={() => setAccent(a.value)}
                data-selected={accent === a.value || undefined}
                title={a.value}
                aria-label={`Select ${a.value} accent`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
