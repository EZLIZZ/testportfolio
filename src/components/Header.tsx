"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const MENU_ITEMS = [
  { title: "Home", href: "/#home" },
  { title: "Work", href: "/#work" },
  { title: "About", href: "/#namaste" },
  { title: "Play", href: "/#collaborate" },
];

const SECTION_IDS = ["home", "work", "namaste", "collaborate"] as const;

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { ref, inView } = useInView({ threshold: 0, rootMargin: "-1px 0px 0px 0px" });
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

/* -------- active section hook -------- */
function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .forEach((e) => setActiveId(e.target.id));
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

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

/* -------- Nav -------- */
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
      <div className="container max-w-7xl mx-auto flex items-center px-1 py-1 bg-white rounded-full">
        {/* Desktop menu */}
        <ul className="hidden md:flex ml-auto space-x-14 text-sm">
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
                    isActive ? "text-black" : "text-gray-800",
                    isSticky ? "" : "",
                  ].join(" ")}
                >
                  {item.title}
                </Link>

                {/* active triangle */}
                {isActive && (
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-black" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop button */}
        <div className="hidden md:flex items-center">
          <Link href="/">
            <button
              className="font-header text-sm bg-background px-7 py-4 text-white rounded-e-full ml-14
                         transition-all duration-300 ease-out transform hover:shadow-lg hover:opacity-70"
              aria-label="Follow Me"
            >
              Follow Me
            </button>
          </Link>
        </div>

        {/* Mobile: menu button + Sheet */}
        <div className="md:hidden ml-auto ">
         <Sheet>
  <SheetTrigger asChild>
    <button
      aria-label="Open menu"
      className="py-2 px-4 rounded-r-full border border-black/10 bg-black backdrop-blur
                 active:scale-[0.98] transition"
    >
      <Menu className="h-6 w-6 text-white" />
    </button>
  </SheetTrigger>

  <SheetContent side="right" className="z-[60] w-[280px] sm:w-[320px] bg-white">
    <SheetHeader className="border-b border-gray-300 pb-3">
      <SheetTitle className="text-lg  font-semibold">Menu</SheetTitle>
    </SheetHeader>

    <nav className="mt-6 space-y-1">
      {MENU_ITEMS.map((item) => {
        const id = item.href.split("#")[1];
        const isActive = activeId === id;
        return (
          <SheetClose asChild key={item.title}>
            <Link
              href={item.href}
              scroll={false}
              onClick={goTo(item.href)}             
              aria-current={isActive ? "page" : undefined}
              className={[
                "block  px-4 py-3 text-base transition-colors",
                isActive ? "bg-black/80 text-white" : "text-black ",
              ].join(" ")}
            >
              {item.title}
            </Link>
          </SheetClose>
        );
      })}
    </nav>
  </SheetContent>
</Sheet>

        </div>
      </div>
    </nav>
  );
}
