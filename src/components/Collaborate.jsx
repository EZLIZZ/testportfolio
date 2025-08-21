export default function Collaborate() {
  return (
    <section
    id= "collaborate" className="relative h-[400px] w-full text-white font-quicksand">
      {/* Background image */}
      <img
        src="/stars.jpg"
        alt="Collaborate"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/*overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content on top */}
      <div className="relative z-20 h-full grid grid-cols-2 items-center">
        <div className="pl-5 sm:pl-10  space-y-3">
          <h2 className="text-3xl sm:text-7xl font-semibold">Want to collaborate ??</h2>
          
        </div>
        <div className="border-l-1 h-full border-white/40 flex items-center text-md sm:text-xl ">
        <div className="w-full px-5 py-10 border-y-1 border-white/40">
            <p className="text-white">
            Let's Connect
          </p>
          <p className="text-white">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
          <p className="text-2xl sm:text-4xl ">
            👋
          </p>
          <button className="btn mt-4 cursor-pointer">Get in touch</button>
          </div>
        </div>
      </div>
    </section>
  );
}
