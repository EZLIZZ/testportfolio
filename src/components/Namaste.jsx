import { MoveRight } from "lucide-react";

export default function Namaste() {
  return (
    <section
      id="namaste"
      className="namaste-section max-w-7xl m-auto px-10 py-20"
    >
      <div className="max-w-4xl font-main text-white">
        {/* headings */}
        <p className="text-3xl leading-tight md:text-5xl/14">NAMASTE 🙏</p>
        <p className="text-3xl leading-tight md:text-5xl/14">I&apos;M JOHN DOE</p>

        <div className="px-10">
          {/* body*/}
          <p className="[overflow-wrap:anywhere] font-extralight mt-5 text-sm md:text-base">
            Tell about your intro and story
            ...........................................................................................................................................................................................................................................................................................................................
          </p>

          <p className="mt-10 flex items-center text-xl md:text-3xl cursor-pointer hover:underline">
            Let&apos;s know more
            <MoveRight className="h-6 w-6 md:h-9 md:w-9 pl-2" />
          </p>
        </div>
      </div>
    </section>
  );
}
