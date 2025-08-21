"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const MENU_ITEMS = [
  { title: "Home", href: "/#home" },
  { title: "Work", href: "/#work" },
  { title: "About", href: "/#namaste" },
  { title: "Play", href: "/#collaborate" }, // was empty
];

const SECTION_IDS = ["home", "work", "namaste", "collaborate"] as const;

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-1px 0px 0px 0px",
  });
  useEffect(() => setIsSticky(!inView), [inView]);

  return (
    <>
      <div ref={ref} className="h-1 absolute top-0 left-0 right-0" />
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isSticky ? "shadow-md" : "bg-transparent mt-6"
        }`}
      >
        <NavBar isSticky={isSticky} />
      </header>
    </>
  );
}

// --- active section hook (center-band IntersectionObserver) ---
function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length || !("IntersectionObserver" in window)) return;

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

  // sync on hash (manual changes / initial load)
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      if (h && ids.includes(h)) setActiveId(h);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [ids]);

  return { activeId, setActiveId };
}

function NavBar({ isSticky }: { isSticky: boolean }) {
  const { activeId, setActiveId } = useActiveSection(SECTION_IDS);

  const goTo = (hashHref: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = hashHref.split("#")[1];
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" }); // use scroll-mt on sections
    history.replaceState(null, "", `/#${id}`);
    setActiveId(id);
  };

  return (
    <nav className="w-full transition-all duration-300 ease-in-out">
      <div className="container max-w-7xl mx-auto flex justify-end items-center px-1 py-1 bg-white bg-opacity-50 lg:rounded-full">
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-14 text-sm">
          {MENU_ITEMS.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = activeId === id;
            return (
              <li key={item.title} className="relative">
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={goTo(item.href)}
                  className={[
                    "font-header font-semibold block py-2 px-1 transition-colors duration-200",
                    "hover:-translate-y-[1px] transition-transform",
                    isActive ? "text-black after:scale-x-100" : "text-gray-800",
                    isSticky ? "" : "",
                  ].join(" ")}
                >
                  {item.title}
                </Link>

                {/* Triangle under active item */}
                {isActive && (
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-black" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Follow Me Button */}
        <div className="flex items-center">
          <Link href="/">
            <button
              className="font-header text-sm bg-background px-7 py-4 text-white rounded-e-full ml-14
             transition-all duration-300 ease-out transform
              hover:shadow-lg hover:opacity-70 cursor-pointer"
              aria-label="Follow Me"
            >
              Follow Me
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
