"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type CursorStyleId =
  | "pixel"
  | "sparkle"
  | "comet"
  | "bubble"
  | "ripple";

export interface CursorStylePreset {
  id: CursorStyleId;
  labelEn: string;
  labelId: string;
  symbol: string; // unicode preview icon
}

export const CURSOR_PRESETS: CursorStylePreset[] = [
  { id: "pixel",   labelEn: "Pixel",   labelId: "Piksel",    symbol: "▪" },
  { id: "sparkle", labelEn: "Sparkle", labelId: "Kilap",     symbol: "✦" },
  { id: "comet",   labelEn: "Comet",   labelId: "Komet",     symbol: "●" },
  { id: "bubble",  labelEn: "Bubble",  labelId: "Gelembung", symbol: "○" },
  { id: "ripple",  labelEn: "Ripple",  labelId: "Riak",      symbol: "◎" },
];

export const DEFAULT_CURSOR: CursorStyleId = "pixel";
const STORAGE_KEY = "portfolio-cursor";
const CHANGE_EVENT = "portfolio-cursor-change";
const VALID = new Set<CursorStyleId>([
  "pixel", "sparkle", "comet", "bubble", "ripple",
]);

interface CursorContextType {
  cursorStyle: CursorStyleId;
  setCursorStyle: (id: CursorStyleId) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

function getClient(): CursorStyleId {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as CursorStyleId | null;
    if (v && VALID.has(v)) return v;
  } catch {
    // ignore
  }
  return DEFAULT_CURSOR;
}

const getServer = (): CursorStyleId => DEFAULT_CURSOR;

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const cursorStyle = useSyncExternalStore(subscribe, getClient, getServer);

  const setCursorStyle = useCallback((id: CursorStyleId) => {
    if (!VALID.has(id)) return;
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return (
    <CursorContext.Provider value={{ cursorStyle, setCursorStyle }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorStyle() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursorStyle must be used within CursorProvider");
  return ctx;
}
