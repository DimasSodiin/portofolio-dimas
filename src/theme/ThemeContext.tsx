"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useEffect,
  ReactNode,
} from "react";

export type ThemeId =
  | "clean-light"
  | "dark-obsidian"
  | "rose-petal"
  | "sky-blue"
  | "lavender-mist";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  labelId: string;
  labelEn: string;
  bgPreview: string;
  accentPreview: string;
  ringPreview: string;
  isDark: boolean;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "clean-light",
    name: "Clean Light",
    labelId: "Bersih Terang",
    labelEn: "Clean Light",
    bgPreview: "#f8f7f4",
    accentPreview: "#161513",
    ringPreview: "#ccc9be",
    isDark: false,
  },
  {
    id: "dark-obsidian",
    name: "Dark Obsidian",
    labelId: "Obsidian Gelap",
    labelEn: "Dark Obsidian",
    bgPreview: "#0c0a09",
    accentPreview: "#fafaf9",
    ringPreview: "#2e2b28",
    isDark: true,
  },
  {
    id: "rose-petal",
    name: "Rose Petal",
    labelId: "Kelopak Mawar",
    labelEn: "Rose Petal",
    bgPreview: "#fff0f2",
    accentPreview: "#c4304a",
    ringPreview: "#f5c0ca",
    isDark: false,
  },
  {
    id: "sky-blue",
    name: "Sky Blue",
    labelId: "Biru Langit",
    labelEn: "Sky Blue",
    bgPreview: "#f0f7ff",
    accentPreview: "#1d6fb8",
    ringPreview: "#b8d8f5",
    isDark: false,
  },
  {
    id: "lavender-mist",
    name: "Lavender Mist",
    labelId: "Kabut Lavender",
    labelEn: "Lavender Mist",
    bgPreview: "#f5f0ff",
    accentPreview: "#6c3fc5",
    ringPreview: "#d4bff5",
    isDark: false,
  },
];

export const DEFAULT_THEME: ThemeId = "clean-light";
export const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

const VALID_THEMES = new Set<ThemeId>(["clean-light", "dark-obsidian", "rose-petal", "sky-blue", "lavender-mist"]);

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  presets: ThemePreset[];
  activePreset: ThemePreset;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDom(id: ThemeId) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  const preset = THEME_PRESETS.find((t) => t.id === id);
  if (preset?.isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function getClientThemeSnapshot(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    if (saved && VALID_THEMES.has(saved)) return saved;
  } catch {
    // Ignore storage errors
  }
  return DEFAULT_THEME;
}

function getServerThemeSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => {
    if (!VALID_THEMES.has(id)) return;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // Ignore storage errors
    }
    applyThemeToDom(id);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const activePreset =
    THEME_PRESETS.find((t) => t.id === theme) || THEME_PRESETS[0];

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, presets: THEME_PRESETS, activePreset }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
