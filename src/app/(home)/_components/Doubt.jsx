"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Doubt() {
  const moonRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const el = moonRef.current;
    if (!section || !el) return;

    gsap.set(section, { perspective: 1000 });
    gsap.set(el, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "visible",
      willChange: "transform",
      transformOrigin: "50% 50%",
      yPercent: -50, // half out (top) initially
      rotateY: 0,
    });

    const reveal = gsap.to(el, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 45%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const flip = gsap.to(el, {
      rotateY: 180,
      duration: 0.8,
      ease: "power2.inOut",
      paused: true,
    });

    const flipTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 15%",
      onEnter: () => flip.play(0),
      onLeaveBack: () => flip.reverse(0),
    });

    return () => {
      reveal.scrollTrigger && reveal.scrollTrigger.kill();
      flipTrigger.kill();
      reveal.kill();
      flip.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="doubt-section"
      className="max-w-7xl m-auto relative h-[240px] sm:h-[370px] w-full overflow-hidden text-white font-main text-6xl my-20"
    >
      <div ref={moonRef} className="absolute inset-0">
        <Image
          src="/smallmoon.png"
          alt="Moon"
          fill
          priority
          sizes="100vw"
          className="object-contain opacity-40 pointer-events-none select-none"
        />
      </div>

      <div
        id="moon-dock"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40"
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-10">
        <div className="w-1/2 border-t border-white/40" />
        <p className="w-full text-left text-3xl sm:text-6xl tracking-wide font-semibold ">
          LESS DOUBT
        </p>
        <p className="w-full text-right text-3xl sm:text-6xl tracking-wide font-semibold ">
          MORE OUTPUT
        </p>
        <div className="w-1/2 border-t border-white/40" />
      </div>
    </section>
  );
}
