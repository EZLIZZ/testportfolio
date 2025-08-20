import { MoveRight } from "lucide-react";

const data = [
    {
        id:1,
        pic: "/work.png",
        title:"Site design of IT company",
        subtitle: "website",

    }
]

export default function Work() {
  return (
    <section className="work-section text-white font-quicksand">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* difference design */}
    <div className="flex justify-center items-center  bg-[#242424] font-sans ml-24">
      <div className="relative isolate w-[130px] h-[55px] whitespace-nowrap bg-[#fefefe] rounded-tr-[75px]">
        <p className="absolute left-0 top-2/3 text-2xl -translate-x-[52%] -translate-y-[90%] transform z-30 px-[30px] text-white mix-blend-difference">
          THE SIMPLE
        </p>
        <p className="absolute left-0 top-3/4 text-xl -translate-x-[11%] transform z-30 px-[30px] text-white mix-blend-difference">
          EASY WORK
        </p>
      </div>
    </div>

    {/* portfolio */}
    <div className="flex items-center text-3xl">
      See the Portfolio
      <MoveRight className="h-9 w-9 ml-2" />
    </div>
  </div>
  <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 mt-20">
   {data.map((item) => (
  <div
  key={item.id}
  className="relative border border-gray-600 rounded-2xl shadow-2xl overflow-hidden h-96 w-80"
>
  {/* Background image box inset by L/B padding */}
  <div
    className="absolute top-0 right-0 bottom-5 left-5 bg-contain bg-no-repeat bg-center "
    style={{ backgroundImage: `url(${item.pic})` }}
  >
    <div className="absolute inset-0  rounded-2xl" />
  </div>

  {/* Text content pinned bottom-left to match padding */}
  <div className="relative z-10 text-white h-full flex flex-col justify-end pl-5 pb-5">
    <p className="text-sm">{item.subtitle}</p>
    <p className="text-xl font-bold">{item.title}</p>
    <p className="underline cursor-pointer">View Detail</p>
  </div>
</div>


))}
  </div>
</section>
  );
}
