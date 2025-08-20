"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const MENU_ITEMS = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/pages/products" },
  { title: "About", href: "/pages/about-us" },
  { title: "Play", href: "/pages/team" },
];

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-1px 0px 0px 0px",
  });

  useEffect(() => {
    setIsSticky(!inView);
  }, [inView]);

  return (
    <>
      <div ref={ref} className="h-1 absolute top-0 left-0 right-0" />
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out  ${
          isSticky ? "shadow-md " : "bg-transparent mt-6"
        }`}
      >
        <NavBar isSticky={isSticky} />
      </header>
    </>
  );
}

function NavBar({ isSticky }: { isSticky: boolean }) {
  return (
    <nav className="w-full transition-all duration-300 ease-in-out">
      <div className="container max-w-7xl mx-auto flex justify-end items-center px-1 py-1 bg-white bg-opacity-50 lg:rounded-full">
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-14 text-sm">
          {MENU_ITEMS.map((item) => (
            <li key={item.title} className="relative group">
              <Link
                href={item.href}
                className={`font-header font-semibold py-2 block hover:text-primary transition-colors ${
                  isSticky ? "text-gray-800" : "text-gray-800"
                }`}
              >
                {item.title}
              </Link>
              {item.title === "Home" && (
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-black" />
              )}
            </li>
          ))}
        </ul>

        {/* Follow Me Button */}
        <div className="flex items-center ">
          <Link href="/pages/login">
            <button className=" font-header text-sm bg-background px-7 py-4 max-h-full text-white rounded-e-full ml-14">
              Follow Me
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
