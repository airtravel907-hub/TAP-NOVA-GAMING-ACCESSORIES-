import React from 'react';
import { Smartphone, Headphones, Monitor, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types/store';

interface CategoryCardInfo {
  name: ProductCategory;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const ShopByCategory: React.FC = () => {
  const { products, setSelectedCategory } = useStore();

  const categories: CategoryCardInfo[] = [
    {
      name: 'Mobile Gaming',
      title: 'Mobile Gaming',
      subtitle: 'Sleeves, Coolers & Stands',
      icon: Smartphone,
      accentColor: '#08D9FF'
    },
    {
      name: 'Audio Gear',
      title: 'Audio Gear',
      subtitle: 'Headsets, TWS & In-Ear Mics',
      icon: Headphones,
      accentColor: '#742CFF'
    },
    {
      name: 'Desk Setup',
      title: 'Desk Setup',
      subtitle: 'RGB Ambient Bars & Desk Mats',
      icon: Monitor,
      accentColor: '#08D9FF'
    },
    {
      name: 'Power & Cables',
      title: 'Power & Cables',
      subtitle: '90° Fast-Charge Esports Cables',
      icon: Zap,
      accentColor: '#742CFF'
    }
  ];

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    const target = document.getElementById('all-products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-14 bg-[#060813] border-b border-[#1E2648]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#742CFF] block mb-1">
              Curated Esports Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Shop by Category
            </h2>
          </div>
          <span className="text-xs text-slate-400 mt-2 sm:mt-0">
            Click to filter catalog
          </span>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = products.filter((p) => p.category === cat.name).length;
            const inStockCount = products
              .filter((p) => p.category === cat.name)
              .reduce((acc, p) => acc + p.stock, 0);

            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-[#0D1127] border border-[#1E2648] hover:border-[#08D9FF]/60 hover:shadow-[0_0_20px_rgba(8,217,255,0.25)] transition-all duration-300 text-left overflow-hidden cursor-pointer"
              >
                {/* Background ambient glow on hover */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#742CFF]/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-[#151B38] border border-[#27325F] flex items-center justify-center mb-4 group-hover:bg-[#742CFF] group-hover:border-[#8542ff] transition-colors">
                  <Icon className="w-6 h-6 text-[#08D9FF] group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#08D9FF] transition-colors font-display">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-3">
                  {cat.subtitle}
                </p>

                <div className="mt-auto pt-3 border-t border-[#182042] w-full flex items-center justify-between text-[11px] text-slate-400">
                  <span>{count} products</span>
                  <span className="font-mono text-emerald-400">{inStockCount} in stock</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
