import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeContext } from './ThemeContext';
import {
  DEFAULT_CONFIG,
  STORAGE_KEY,
  type ThemeAccent,
  type ThemeConfig,
  type ThemeContextValue,
  type ThemeMode,
  type ThemeTypography,
  type ThemeVariant,
} from './theme.types';

/* =============================================================================
   HELPERS
   ============================================================================= */

function getStoredConfig(): ThemeConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<ThemeConfig>;
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch {
    // Ignore parse errors
  }

  return DEFAULT_CONFIG;
}

function getSystemMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyThemeToDOM(
  resolvedMode: 'light' | 'dark',
  variant: ThemeVariant,
  accent: ThemeAccent,
  typography: ThemeTypography
) {
  const html = document.documentElement;

  // Apply mode
  html.setAttribute('data-theme', resolvedMode);

  // Apply variant (only if not default)
  if (variant === 'zinc') {
    html.removeAttribute('data-variant');
  } else {
    html.setAttribute('data-variant', variant);
  }

  // Apply accent (only if not default)
  if (accent === 'blue') {
    html.removeAttribute('data-accent');
  } else {
    html.setAttribute('data-accent', accent);
  }

  // Apply typography (only if not default)
  if (typography === 'system') {
    html.removeAttribute('data-typography');
  } else {
    html.setAttribute('data-typography', typography);
  }
}

/* =============================================================================
   PROVIDER
   ============================================================================= */

interface ThemeProviderProps {
  children: ReactNode;
  defaultConfig?: Partial<ThemeConfig>;
}

export function ThemeProvider({ children, defaultConfig }: ThemeProviderProps) {
  const [config, setConfig] = useState<ThemeConfig>(() => ({
    ...DEFAULT_CONFIG,
    ...defaultConfig,
    ...getStoredConfig(),
  }));

  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(getSystemMode);

  const resolvedMode =
    config.mode === 'system' ? systemMode : config.mode;

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    applyThemeToDOM(resolvedMode, config.variant, config.accent, config.typography);
  }, [resolvedMode, config.variant, config.accent, config.typography]);

  // Persist config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  const setMode = useCallback((mode: ThemeMode) => {
    setConfig((prev) => ({ ...prev, mode }));
  }, []);

  const setVariant = useCallback((variant: ThemeVariant) => {
    setConfig((prev) => ({ ...prev, variant }));
  }, []);

  const setAccent = useCallback((accent: ThemeAccent) => {
    setConfig((prev) => ({ ...prev, accent }));
  }, []);

  const setTypography = useCallback((typography: ThemeTypography) => {
    setConfig((prev) => ({ ...prev, typography }));
  }, []);

  const setTheme = useCallback((partial: Partial<ThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...config,
      resolvedMode,
      setMode,
      setVariant,
      setAccent,
      setTypography,
      setTheme,
    }),
    [config, resolvedMode, setMode, setVariant, setAccent, setTypography, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
