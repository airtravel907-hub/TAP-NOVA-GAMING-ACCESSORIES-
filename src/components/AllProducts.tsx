import React, { useState } from 'react';
import { Search, ShoppingCart, MessageSquare, Eye, SlidersHorizontal, Package, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types/store';

export const AllProducts: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    addToCart,
    generateDirectWhatsAppUrl,
    setActiveProductModal,
    setActiveImageModal,
    settings
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'stock'>('featured');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Mobile Gaming',
    'Audio Gear',
    'Desk Setup',
    'Power & Cables'
  ];

  // Filtering & Search
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.sellingPrice - b.sellingPrice;
    if (sortBy === 'price-high') return b.sellingPrice - a.sellingPrice;
    if (sortBy === 'stock') return b.stock - a.stock;
    return 0; // default order
  });

  return (
    <section id="all-products" className="py-14 sm:py-20 bg-[#060813] border-b border-[#1E2648]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#1E2648] gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#08D9FF] block mb-1">
              Esports Grade Arsenal
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
              All Products
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Genuine gaming hardware with live stock levels and immediate WhatsApp checkout.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gear..."
              className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs and Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          {/* Category Pill Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0D1127] border border-[#1E2648] rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#742CFF] text-white shadow-[0_0_12px_rgba(116,44,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-[#151B38]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0D1127] border border-[#1E2648] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#08D9FF]"
            >
              <option value="featured">Featured Catalog</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock Quantity</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0D1127] border border-[#1E2648]">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No products found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              We couldn't find any gaming accessory matching "{searchTerm}". Try clearing your filter or search query.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-lg bg-[#742CFF] text-white text-xs font-semibold hover:bg-[#8542ff] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product: Product) => {
              const isOutOfStock = product.stock <= 0;
              const directWhatsAppUrl = generateDirectWhatsAppUrl('product', product.id, 1);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col rounded-2xl bg-[#0D1127] border border-[#1E2648] hover:border-[#08D9FF]/50 transition-all duration-300 overflow-hidden relative hover:shadow-[0_0_25px_rgba(8,217,255,0.15)]"
                >
                  {/* Product Image Box */}
                  <div className="relative aspect-[4/3] bg-[#070A18] overflow-hidden">
                    {product.image && product.image.trim() !== '' ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => setActiveProductModal(product)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                        TapNova Hardware
                      </div>
                    )}

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1127] via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-[#060813]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 border border-[#1E2648]">
                      {product.category}
                    </div>

                    {/* New Stock Badge if flagged */}
                    {product.isNewStock && (
                      <div className="absolute top-3 right-3 bg-[#742CFF] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(116,44,255,0.6)] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>New Stock</span>
                      </div>
                    )}

                    {/* Enlarge preview trigger */}
                    {product.image && product.image.trim() !== '' && (
                      <button
                        onClick={() => setActiveImageModal(product.image)}
                        className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#060813]/80 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-[#08D9FF] hover:text-[#060813] transition-all opacity-0 group-hover:opacity-100"
                        title="Enlarge product image"
                        aria-label={`Enlarge image of ${product.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title & Quick Click to Modal */}
                      <h3
                        onClick={() => setActiveProductModal(product)}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-[#08D9FF] transition-colors cursor-pointer font-display line-clamp-1 mb-1.5"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Stock Status Indicator */}
                      <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-[#080B1C] border border-[#182042] mb-4">
                        <span className="text-slate-400">Stock Status:</span>
                        {isOutOfStock ? (
                          <span className="font-semibold text-rose-400 font-mono">
                            Out of Stock
                          </span>
                        ) : product.stock <= 3 ? (
                          <span className="font-semibold text-amber-400 font-mono">
                            Only {product.stock} units left!
                          </span>
                        ) : (
                          <span className="font-semibold text-emerald-400 font-mono">
                            In Stock ({product.stock} units)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Price & Purchase Affordances */}
                    <div className="pt-3 border-t border-[#1E2648]">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                            Selling Price
                          </span>
                          <span className="text-xl font-black text-white font-mono">
                            {settings.currency} {product.sellingPrice.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveProductModal(product)}
                          className="text-[11px] text-[#08D9FF] hover:underline font-medium"
                        >
                          View Details →
                        </button>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => addToCart('product', product.id, 1)}
                          disabled={isOutOfStock}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#742CFF] hover:bg-[#8542ff] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(116,44,255,0.25)] active:scale-95"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>

                        {directWhatsAppUrl && !isOutOfStock ? (
                          <a
                            href={directWhatsAppUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] active:scale-95 text-center"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="py-2.5 px-3 rounded-lg bg-slate-800 text-slate-500 text-xs font-semibold text-center cursor-not-allowed"
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
