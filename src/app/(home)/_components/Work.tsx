'use client';

import { MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  imageUrl?: string | null;
  updatedAt: string;
};

export default function Work() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/projects', { cache: 'no-store' });
        if (!r.ok) throw new Error('Failed to load projects');
        const data: Project[] = await r.json();
        setItems(data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="work" className="work-section text-white font-quicksand scroll-mt-32">
      {/* top bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 px-4">
        {/* difference design */}
        <div className="flex justify-center items-center bg-[#242424] font-sans md:ml-24">
          <div className="relative isolate w-[130px] h-[55px] whitespace-nowrap bg-[#fefefe] rounded-tr-[75px]">
            <p className="absolute left-0 top-2/3 text-xl md:text-2xl -translate-x-[52%] -translate-y-[90%] transform z-30 px-[30px] text-white mix-blend-difference">
              THE SIMPLE
            </p>
            <p className="absolute left-0 top-3/4 text-sm md:text-xl -translate-x-[11%] transform z-30 px-[30px] text-white mix-blend-difference">
              EASY WORK
            </p>
          </div>
        </div>

        {/* portfolio link */}
        <div className="flex items-center text-2xl md:text-3xl cursor-pointer hover:underline self-center md:self-auto">
          See the Portfolio
          <MoveRight className="h-7 w-7 md:h-9 md:w-9 ml-2" />
        </div>
      </div>

      {/* grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mt-20 px-4">
        {/* loading / error states */}
        {loading && (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 md:h-96 w-full mx-auto md:mx-0 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </>
        )}
        {error && !loading && (
          <div className="col-span-full text-red-300">{error}</div>
        )}

        {!loading &&
          !error &&
          items.map((item) => {
            const bg = item.imageUrl ?? '/work.png'; 
            return (
              <div
                key={item.id}
                className="relative border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-64 sm:h-full  w-full  mx-auto md:mx-0"
              >
                {/* Background image */}
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${bg})` }}
                >
                  <div className="absolute inset-0 rounded-2xl" />
                </div>

                {/* Text content */}
                <div className="relative z-10 text-white/80 h-full flex flex-col justify-end pl-5 pb-5">
                  {item.subtitle && (
                    <p className="w-fit px-2 py-1 rounded-2xl bg-[linear-gradient(92.62deg,_rgba(34,34,34,0.6)_-5.03%,_rgba(223,167,165,0.6)_49.44%,_rgba(173,124,111,0.6)_108.64%)] text-sm">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="text-lg md:text-xl">{item.title}</p>
                  <p className="text-sm cursor-pointer flex hover:underline items-center">
                    View Detail <MoveRight className="ml-2" />
                  </p>
                </div>
              </div>
            );
          })}
          <div className='h-64 md:h-96 w-full mx-auto md:mx-0 rounded-2xl border border-white/10 flex flex-col justify-center items-center space-y-10'>
            <p className="text-center text-white/80 text-2xl font-main">
             Couldn&apos;t find what you need?
            </p>
            <p className='text-center text-white/50 '>
              Suggest a tutorial, course or video. I read seek  feedback/suggestion!
            </p>
            <button className="w-fit px-10 py-2 rounded-full bg-[linear-gradient(92.62deg,_rgba(34,34,34,0.6)_-5.03%,_rgba(223,167,165,0.6)_49.44%,_rgba(173,124,111,0.6)_108.64%)] flex text-sm">
                     Request Now <MoveRight />
                    </button>
          </div>
      </div>
    </section>
  );
}
