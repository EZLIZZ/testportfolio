// app/components/DoubtBanner.tsx
import Image from "next/image";

export default function Doubt() {
  return (
    <section className="relative h-[240px] sm:h-[370px] w-full  overflow-hidden text-white font-main text-6xl my-20">
      {/* Moon (centered) */}
      <Image
        src="/smallmoon.png"
        alt="Moon"
        fill
        priority
        sizes="100vw"
        className="object-contain opacity-40 pointer-events-none select-none scale-x-[-1]"
      />

      {/* Thin lines */}
      <div className="absolute top-1/2  -translate-y-1/2 " >
      <div className="border-t-1 w-full bg-white" />
       <p>LESS DOUBT</p>
       <p>MORE OUTPUT</p>
      {/* Text */}
      {/* <h2 className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-10 text-white text-2xl sm:text-6xl tracking-wide font-semibold">
        LESS DOUBT
      </h2>
      <h2 className="absolute top-3/4 -translate-y-1/2 right-4 sm:right-10 text-white text-2xl sm:text-6xl tracking-wide font-semibold">
        MORE OUTPUT
      </h2>  */}
      Hello
      </div>
    </section>
  );
}
