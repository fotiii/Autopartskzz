import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from './ProductCard';

interface CatalogPageProps {
  addToCart: (product: any) => void;
  selectedVehicle: any;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ addToCart, selectedVehicle }) => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: [0, 100000] as [number, number],
    inStock: false,
    rating: 0,
  });

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const vin = searchParams.get('vin');

  const allBrands = ['Mobil 1', 'Shell', 'Castrol', 'Bosch', 'Brembo', 'Mann-Filter', 'ATE', 'Total', 'Liqui Moly'];

  // Mock products data
  const allProducts = Array.from({ length: 24 }, (_, i) => ({
    id: `cat-${i + 1}`,
    name: `Товар ${i + 1}`,
    category: category || 'oils',
    price: Math.floor(Math.random() * 50000) + 5000,
    oldPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 60000) + 10000 : undefined,
    image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=400',
    brand: allBrands[Math.floor(Math.random() * allBrands.length)],
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 10,
    inStock: Math.random() > 0.1,
    badge: Math.random() > 0.8 ? `-${Math.floor(Math.random() * 30) + 10}%` : undefined,
  }));

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 100000],
      inStock: false,
      rating: 0,
    });
  };

  const getCategoryTitle = () => {
    if (vin) return `Результаты для VIN: ${vin}`;
    if (search) return `Поиск: ${search}`;
    const titles: { [key: string]: string } = {
      oils: 'Масла и жидкости',
      filters: 'Фильтры',
      brakes: 'Тормозная система',
      battery: 'Аккумуляторы',
      suspension: 'Подвеска',
      lighting: 'Освещение',
      engine: 'Двигатель',
      transmission: 'Трансмиссия',
      electrics: 'Электрооборудование',
      body: 'Кузов',
      accessories: 'Аксессуары',
    };
    return titles[category || ''] || 'Каталог';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {selectedVehicle && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-900">
                Подбор для: {selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Изменить
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Фильтры
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Сбросить
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Бренд</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Цена</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [Number(e.target.value), prev.priceRange[1]],
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], Number(e.target.value)],
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, inStock: e.target.checked }))
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Только в наличии</span>
                </label>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Рейтинг</h4>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => setFilters((prev) => ({ ...prev, rating }))}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                        <span className="text-sm ml-1">и выше</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{getCategoryTitle()}</h1>
                  <p className="text-gray-600 mt-1">{allProducts.length} товаров</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Фильтры
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="popular">Популярные</option>
                    <option value="price_asc">Цена: по возрастанию</option>
                    <option value="price_desc">Цена: по убыванию</option>
                    <option value="rating">Рейтинг</option>
                    <option value="new">Новинки</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  Предыдущая
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      page === 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Следующая
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
