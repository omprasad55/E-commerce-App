import React, { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import assets from '../assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import Tittle from '../components/Tittle';
import MerchandiseCollections from '../components/MerchandiseCollections';
import BrandCollection from '../components/BrandCollection';
import LimitedStocks from '../components/LimitedStocks';


const Collection = () => {


  const [sortOption, setSortOption] = useState('');
  const [sortOpen, setSortOpen] = useState(false);


  const { products, search, showSearch } = useContext(ShopContext);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const filteredProducts = products.filter((item) => {
  if (
    activeCategory &&
    item.category?.toLowerCase() !== activeCategory.toLowerCase()
  ) {
    return false;
  }

  if (
    activeType &&
    item.subcategory?.toLowerCase() !== activeType.toLowerCase()
  ) {
    return false;
  }

  if (
    search &&
    !item.name.toLowerCase().includes(search.toLowerCase())
  ) {
    return false;
  }

  return true;
});







  useEffect(() => {
    if (search.trim() === '') return;
    setActiveCategory(null);
    setActiveType(null);
  }, [search]);



  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating-high-low':
        return (b.rating || 0) - (a.rating || 0);
      case 'name-az':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });


  const DEFAULT_LIMIT = 12;


  const visibleProducts = activeCategory
    ? sortedProducts
    : sortedProducts.slice(0, DEFAULT_LIMIT);


  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);






  const categories = [
    {
      name: 'Men',
      types: ['TopWear', 'BottomWear', 'WinterWear'],
      image: assets.men_collection1,
    },
    {
      name: 'Women',
      types: ['TopWear', 'BottomWear', 'WinterWear'],
      image: assets.women_collection,
    },
    {
      name: 'Kids',
      types: ['TopWear', 'BottomWear', 'WinterWear'],
      image: assets.kids_collection,
    },
  ];

  return (
    <div className="pt-10 border-t border-gray-300 flex flex-center flex-col min-h-screen overflow-hidden">

      {/* ===== CATEGORY BAR ===== */}
      <div className="relative flex justify-center gap-8 sm:gap-10 text-lg font-medium">
        {categories.map((cat) => (
          <div key={cat.name} className="group relative">

            {/* CATEGORY BUTTON */}
            <button
              onClick={() => {
                setActiveCategory(cat.name);
                setActiveType(null);
              }}
              className={`pb-2 border-b-2 transition cursor-pointer ${activeCategory === cat.name
                ? 'border-black'
                : 'border-transparent hover:border-gray-400'
                }`}
            >
              {cat.name.toUpperCase()}
            </button>

            {/* HOVER BUFFER + MENU */}
            <div
              className=" 
          absolute left-1/2 top-full pt-3 z-50
          -translate-x-1/2
          opacity-0 scale-95 translate-y-2
          pointer-events-none
          transition-all duration-200 ease-out
          group-hover:opacity-100
          group-hover:scale-100
          group-hover:translate-y-0
          group-hover:pointer-events-auto
        "
            >
              {/* FLOATING PANEL */}
              <div
                className="
            flex flex-col sm:flex-row
            w-[90vw] sm:w-[680px]
            max-w-[720px]
            rounded-2xl
            bg-white/95 backdrop-blur-md
            shadow-2xl ring-1 ring-black/5
            overflow-hidden
          "
              >
                {/* LEFT OPTIONS */}
                <div className="w-full sm:w-1/2 p-5">
                  <p className="font-semibold mb-4">
                    {cat.name} Clothing
                  </p>

                  <div className="flex flex-col gap-3 text-sm ">
                    {cat.types.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setActiveCategory(cat.name);
                          setActiveType(type);
                        }}
                        className="
                    text-left px-3 py-2 rounded-lg cursor-pointer
                    text-gray-700
                    hover:bg-gray-100 hover:text-black
                    transition
                  "
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT IMAGE (hidden on mobile) */}
                <div className="hidden sm:block sm:w-1/2">
                  <img
                    src={cat.image}

                    alt={cat.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>


        ))}

      </div>


      {/* ===== SORT DROPDOWN ===== */}
      <div ref={sortRef} className=" relative mt-10 px-4 flex justify-center">
        <div className="relative">

          {/* SORT BUTTON */}
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="
        flex items-center gap-2
        px-5 py-2.5
        rounded-xl
        bg-white/90 backdrop-blur-md
        shadow-lg ring-1 ring-black/5
        text-sm font-medium
        text-gray-800
        hover:shadow-xl
        transition
        cursor-pointer
      "
          >
            Sort By
            <span
              className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''
                }`}
            >
              ▾
            </span>
          </button>

          {/* DROPDOWN PANEL */}
          <div
            className={`
        absolute right-0 mt-3 z-50
        w-64
        rounded-2xl
        bg-white/95 backdrop-blur-md
        shadow-2xl ring-1 ring-black/5
        overflow-hidden
        transition-all duration-200 ease-out
        ${sortOpen
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
      `}
          >
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">
                Sort Products
              </p>

              <div className=" flex flex-col gap-2 text-sm">
                {[
                  { label: 'Price: Low → High', value: 'price-low-high' },
                  { label: 'Price: High → Low', value: 'price-high-low' },
                  { label: 'Rating: High → Low', value: 'rating-high-low' },
                  { label: 'Name: A → Z', value: 'name-az' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortOption(opt.value);
                      setSortOpen(false);
                    }}
                    className={`
                text-left px-3 py-2 rounded-lg
                transition cursor-pointer
                ${sortOption === opt.value
                        ? 'bg-gray-100 text-black font-medium'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                      }
              `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* ===== SEARCH RESULT INFO ===== */}
      {showSearch && search && (
        <p className="mt-8 text-sm text-gray-500 text-center">
          Showing results for "<span className="font-medium">{search}</span>"
        </p>
      )}


      {visibleProducts.length === 0 && (
        <p className="col-span-full text-center text-gray-500 mt-10">
          No products found
          {search && (
            <>
              {' '}for "<span className="font-medium">{search}</span>"
            </>
          )}
        </p>
      )}





      {/* ===== PRODUCT GRID ===== */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 mb-10">
        {visibleProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>






      <MerchandiseCollections />
      <LimitedStocks />
      <BrandCollection />





    </div>
  );
};

export default Collection;
