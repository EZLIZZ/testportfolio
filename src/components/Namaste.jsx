import { MoveRight } from "lucide-react";

export default function Namaste() {
  return (
    <section
      id="namaste"
      className="namaste-section max-w-7xl m-auto  px-10 py-20 "
    >
      <div className="max-w-4xl  font-main text-white">
        <p className="text-5xl/14">NAMASTE 🙏</p>
        <p className="text-5xl/14">I'M JOHN DOE</p>
        <div className="px-10">
          <p className="[overflow-wrap:anywhere]  font-extralight mt-5">
            Tell about your intro and story
            ...........................................................................................................................................................................................................................................................................................................................
          </p>
          <p className="mt-10 flex items-center text-3xl cursor-pointer hover:underline">
            Let's know more <MoveRight className="h-9 w-9 pl-2 " />
          </p>
        </div>
      </div>
    </section>
  );
}
