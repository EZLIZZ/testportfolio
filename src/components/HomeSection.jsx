"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
  const moonRef = useRef(null);

  useLayoutEffect(() => {
    const moonEl = moonRef.current;
    const dockEl = document.getElementById("moon-dock");
    const doubtSection = document.getElementById("doubt-section");
    if (!moonEl || !dockEl || !doubtSection) return;

    const getCenter = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const updateTween = () => {
      const m = getCenter(moonEl);
      const d = getCenter(dockEl);
      const dx = d.x - m.x;
      const dy = d.y - m.y;

      gsap.to(moonEl, {
        x: dx,
        y: dy,
        scale: 0.1,
        scaleX: -1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top+=1",
          endTrigger: doubtSection,
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    };

    updateTween();
    window.addEventListener("resize", updateTween);
    return () => {
      window.removeEventListener("resize", updateTween);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="home" className="home-section relative w-full overflow-hidden h-[70vh] md:h-[90vh]">
      {/* Moon image */}
      <img
        ref={moonRef}
        src="/chand.png"
        alt="Background"
        className="
          h-full w-full object-cover transform
          scale-100 translate-x-0
          md:scale-140 md:translate-x-30
        "
      />

      {/* Text block */}
      <div
        className="
          absolute top-1/2 left-1/2 transform
            px-0 sm:px-6 max-w-[92vw]
          md:max-w-2xl -translate-x-4/5 -translate-y-1/2
          font-main text-white
          space-y-8 md:space-y-20
        "
      >
        <p className="text-2xl sm:text-3xl md:text-5xl/14 text-left">
          FROM DARKNESS TO THE DAWN, IDEAS TAKE FLIGHT.
        </p>

        <div className="px-0 md:px-10 text-left md:text-left">
          <p className="font-extralight text-sm sm:text-base">
            Hi, I am <span className="font-semibold">John Doe</span>, Welcome to my portfolio.
          </p>
          <button className="btn mt-8 md:mt-20">Download resume</button>
        </div>
      </div>
    </section>
  );
}
