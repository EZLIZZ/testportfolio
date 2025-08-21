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
        scale: 0.1, // shrink a bit, but starts from tailwind's scale-140
        scaleX: -1, // ensure no horizontal flip
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement, // start listening immediately
          start: "top top+=1", // first pixel of scroll
          endTrigger: doubtSection, // tie the end to the Doubt section
          end: "bottom top", // when Doubt’s bottom hits viewport top (fully hidden)
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
    <section className="home-section relative h-[90vh] w-full overflow-hidden">
      {/* main moon image  */}
      <img
        ref={moonRef}
        src="/chand.png"
        alt="Background"
        className="h-full w-full object-cover transform scale-140 translate-x-30"
      />

      <div className="max-w-2xl absolute top-1/2 left-1/2 transform -translate-x-4/5 -translate-y-1/2 font-main text-white space-y-20">
        <p className="text-5xl/14">
          FROM DARKNESS TO THE DAWN, IDEAS TAKE FLIGHT.
        </p>
        <div className="px-10">
          <p className="font-extralight">
            Hi, I am <span className="font-semibold">John Doe</span>, Welcome to
            my portfolio.
          </p>
          <button className="btn mt-20"> Download resume</button>
        </div>
      </div>
    </section>
  );
}
