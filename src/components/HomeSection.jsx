export default function HomeSection() {
  return (
    <section className="home-section relative h-[90vh] w-full overflow-hidden">
      <img
        src="/chand.png"
        alt="Background"
        className="h-full w-full object-cover transform scale-140 translate-x-30 "
      />
      <div
        className="max-w-2xl absolute  top-1/2 left-1/2 transform -translate-x-4/5 -translate-y-1/2 font-main
                     text-white space-y-20 "
      >
        <p className="text-5xl/14">
        FROM DARKNESS TO THE DAWN, IDEAS TAKE FLIGHT.
        </p>
        <div className="px-10">
        <p className="font-extralight">Hi, I am <span className="font-semibold">John Doe</span>, Welcome to my portfolio.</p>
        <button className="btn mt-20"> Download resume</button>        
        </div>
      </div>
    </section>
  );
}
