import { Sun, Moon, Palette, Pipette, Type } from "lucide-react";
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

const typographyOptions: { value: string; label: string }[] = [
  { value: "system", label: "System" },
  { value: "modern", label: "Modern" },
  { value: "geometric", label: "Geometric" },
  { value: "editorial", label: "Editorial" },
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
    <div className="theme-controls">
      {/* Mode Toggle */}
      <button
        className="theme-controls__btn"
        onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
        title={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
        aria-label="Toggle theme mode"
      >
        {resolvedMode === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      <div className="theme-controls__divider" />

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
  );
}
