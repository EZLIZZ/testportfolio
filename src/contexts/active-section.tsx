"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const DEFAULT_IDS = ["home", "work", "namaste", "collaborate"] as const;

type Ctx = {
  activeId: string;
  setActiveId: (id: string) => void;
  scrollToId: (id: string, opts?: { block?: "start" | "center" }) => void;
};

const ActiveSectionCtx = createContext<Ctx | null>(null);

export function ActiveSectionProvider({
  children,
  ids = DEFAULT_IDS as readonly string[],
}: {
  children: ReactNode;
  ids?: readonly string[];
}) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  // IntersectionObserver to track active section
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .forEach((e) => setActiveId(e.target.id));
      },
      {
        root: null,
        
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  // Sync with URL hash 
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ids.includes(hash)) setActiveId(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [ids]);

  // Smooth scroll helper
  const scrollToId = (id: string, opts?: { block?: "start" | "center" }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: opts?.block ?? "start",
    });
    history.replaceState(null, "", `/#${id}`);
    setActiveId(id);
  };

  const value = useMemo(
    () => ({ activeId, setActiveId, scrollToId }),
    [activeId]
  );

  return (
    <ActiveSectionCtx.Provider value={value}>
      {children}
    </ActiveSectionCtx.Provider>
  );
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionCtx);
  if (!ctx) throw new Error("useActiveSection must be used within ActiveSectionProvider");
  return ctx;
}
