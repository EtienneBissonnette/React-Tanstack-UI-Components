import { useTheme, type ThemeAccent, type ThemeVariant } from '../../context';
import './ThemeControls.css';

const variants: { value: ThemeVariant; label: string }[] = [
  { value: 'zinc', label: 'Zinc' },
  { value: 'slate', label: 'Slate' },
  { value: 'stone', label: 'Stone' },
  { value: 'gray', label: 'Gray' },
  { value: 'neutral', label: 'Neutral' },
];

const accents: { value: ThemeAccent; color: string }[] = [
  { value: 'blue', color: '#3b82f6' },
  { value: 'red', color: '#ef4444' },
  { value: 'green', color: '#22c55e' },
  { value: 'orange', color: '#f97316' },
  { value: 'violet', color: '#8b5cf6' },
  { value: 'rose', color: '#f43f5e' },
];

export function ThemeControls() {
  const { resolvedMode, variant, accent, setMode, setVariant, setAccent } = useTheme();

  return (
    <div className="theme-controls">
      <div className="theme-controls__group">
        <span className="theme-controls__label">Mode</span>
        <button
          className="theme-controls__mode-btn"
          onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
          title={`Switch to ${resolvedMode === 'dark' ? 'light' : 'dark'} mode`}
        >
          {resolvedMode === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="theme-controls__group">
        <span className="theme-controls__label">Variant</span>
        <select
          className="theme-controls__select"
          value={variant}
          onChange={(e) => setVariant(e.target.value as ThemeVariant)}
        >
          {variants.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <div className="theme-controls__group">
        <span className="theme-controls__label">Accent</span>
        <div className="theme-controls__swatches">
          {accents.map((a) => (
            <button
              key={a.value}
              className="theme-controls__swatch"
              style={{ backgroundColor: a.color }}
              onClick={() => setAccent(a.value)}
              data-selected={accent === a.value || undefined}
              title={a.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
