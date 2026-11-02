import React from 'react';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  gamerTag: string;
  city: string;
  itemPurchased: string;
  rating: number;
  date: string;
  quote: string;
}

export const VerifiedReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 'rev-1',
      name: 'Hamza Tariq',
      gamerTag: 'Tariq_FPS',
      city: 'Karachi',
      itemPurchased: 'Mobile Finger Sleeves (Pack of 10)',
      rating: 5,
      date: 'Verified Buyer',
      quote:
        'The silver conductive fiber has virtually zero friction drag on my 120Hz screen. Gyro aiming and quick-scope tracking in competitive PUBG Mobile matches feel drastically smoother. Arrived in 2 days via COD in secure packaging.'
    },
    {
      id: 'rev-2',
      name: 'Daniyal Khan',
      gamerTag: 'DaniPlayz',
      city: 'Lahore',
      itemPurchased: 'Deal 5: Ultimate Gaming Combo',
      rating: 5,
      date: 'Verified Buyer',
      quote:
        'The magnetic semiconductor cooler dropped my phone from 42°C down to 18°C in under a minute—zero frame drops during high-intensity matches. The cat headset audio is punchy with clear footstep separation. Free delivery promo was honored!'
    },
    {
      id: 'rev-3',
      name: 'Shahmeer Ali',
      gamerTag: 'ViperX',
      city: 'Faisalabad',
      itemPurchased: 'Deal 4: Gaming Setup Deal',
      rating: 5,
      date: 'Verified Buyer',
      quote:
        'Ordering through WhatsApp was fast and effortless. The team confirmed my order details in 5 minutes and dispatched it same day. The RGB desk light modes match my battlestation perfectly, and the micro-weave desk pad is flawless.'
    },
    {
      id: 'rev-4',
      name: 'Zainab Raza',
      gamerTag: 'ZaiGaming',
      city: 'Islamabad',
      itemPurchased: 'Cat Gaming Headset',
      rating: 5,
      date: 'Verified Buyer',
      quote:
        'The headset is even better in person than in photos! The neon glowing ears look stunning on stream, and the thick memory foam cushions do not press against my glasses even after 4 hours of continuous gameplay.'
    },
    {
      id: 'rev-5',
      name: 'Usman Javed',
      gamerTag: 'Ghost_99',
      city: 'Rawalpindi',
      itemPurchased: 'Deal 2: Mobile Gamer Stand Combo',
      rating: 5,
      date: 'Verified Buyer',
      quote:
        'The dual-axis stand is solid aluminum with no wobble, and the 90-degree cable cutout allows easy charging during marathon sessions. Sleeves breathe well and eliminate thumb sweat entirely.'
    },
    {
      id: 'rev-6',
      name: 'Bilal Ahmed',
      gamerTag: 'ShadowByte',
      city: 'Peshawar',
      itemPurchased: 'Wired Gaming Earphones',
      rating: 5,
      date: 'Verified Buyer',
      quote:
        'The detachable boom mic makes team comms crystal clear on Discord. Excellent passive noise isolation and solid bass punch without muddying game footsteps. Best value gaming purchase of the year.'
    }
  ];

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#060813] border-b border-[#1E2648]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B38] border border-[#27325F] text-[#08D9FF] text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#08D9FF]" />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mb-3">
            Verified Gamer Reviews
          </h2>
          <p className="text-sm text-slate-400">
            Real feedback from competitive players and creators using TapNova hardware every day.
          </p>

          {/* Rating Summary Strip */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 p-4 rounded-2xl bg-[#0D1127] border border-[#1E2648]">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                4.9
              </span>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  5-Star Average Rating
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#1E2648]" />

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Delivery Customers</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#1E2648]" />

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ThumbsUp className="w-4 h-4 text-[#08D9FF] shrink-0" />
              <span>98% Recommendation Rate</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#0D1127] border border-[#1E2648] hover:border-[#742CFF]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top: 5 Stars and Verified Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{rev.date}</span>
                  </span>
                </div>

                {/* Review Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author & Item Metadata */}
              <div className="pt-4 border-t border-[#182042] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">@{rev.gamerTag}</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">{rev.city}</span>
                </div>

                <div className="text-right max-w-[45%]">
                  <span className="text-[10px] text-slate-500 block uppercase">Gear</span>
                  <span className="text-[11px] text-[#08D9FF] font-medium truncate block">
                    {rev.itemPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
