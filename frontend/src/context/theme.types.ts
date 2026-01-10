export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeVariant = 'zinc' | 'slate' | 'stone' | 'gray' | 'neutral';
export type ThemeAccent =
  | 'blue'
  | 'red'
  | 'green'
  | 'orange'
  | 'violet'
  | 'rose';

export interface ThemeConfig {
  mode: ThemeMode;
  variant: ThemeVariant;
  accent: ThemeAccent;
}

export interface ThemeContextValue extends ThemeConfig {
  /** Resolved mode (light or dark, never system) */
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  setVariant: (variant: ThemeVariant) => void;
  setAccent: (accent: ThemeAccent) => void;
  setTheme: (config: Partial<ThemeConfig>) => void;
}

export const STORAGE_KEY = 'theme-config';

export const DEFAULT_CONFIG: ThemeConfig = {
  mode: 'system',
  variant: 'zinc',
  accent: 'blue',
};
