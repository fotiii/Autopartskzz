import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Barcode, Car } from 'lucide-react';
import VinSearchModal from './VinSearchModal';
import { apiGet } from '../api';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVinModalOpen, setIsVinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery.trim()) return setSuggestions([]);
      const lastVehicle = localStorage.getItem('lastVehicle');
      const vehicleKey = lastVehicle ? encodeURIComponent(lastVehicle) : '';
      apiGet<{ suggestions: any[] }>(
        `/search/suggestions?q=${encodeURIComponent(searchQuery)}&vehicle=${vehicleKey}`,
      )
        .then((data) => setSuggestions(data.suggestions))
        .catch(() => setSuggestions([]));
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = [
    { name: 'Двигатель', icon: '🔧', path: '/catalog?category=engine' },
    { name: 'Трансмиссия', icon: '⚙️', path: '/catalog?category=transmission' },
    { name: 'Подвеска', icon: '🚗', path: '/catalog?category=suspension' },
    { name: 'Тормоза', icon: '🛑', path: '/catalog?category=brakes' },
    { name: 'Электрика', icon: '⚡', path: '/catalog?category=electrics' },
    { name: 'Кузов', icon: '🚙', path: '/catalog?category=body' },
    { name: 'Масла и жидкости', icon: '🛢️', path: '/catalog?category=oils' },
    { name: 'Аксессуары', icon: '⭐', path: '/catalog?category=accessories' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3 py-2.5">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link to="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
                <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 shrink-0" />
                <span className="font-bold text-lg sm:text-xl truncate">
                  AUTO<span className="text-blue-600">PARTS</span>.KZ
                </span>
              </Link>

              <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsVinModalOpen(true)}
                  className="sm:hidden p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Поиск по VIN"
                >
                  <Barcode className="w-5 h-5" />
                </button>

                <Link
                  to="/account"
                  className="p-2 sm:px-4 sm:py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Профиль"
                >
                  <User className="w-5 h-5" />
                </Link>

                <Link
                  to="/cart"
                  className="p-2 sm:px-4 sm:py-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                  aria-label="Корзина"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <form onSubmit={handleSearch} className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  list="search-suggestions"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск запчастей, масел, аксессуаров..."
                  className="w-full pl-10 pr-24 sm:pr-32 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                <datalist id="search-suggestions">
                  {suggestions.map((s) => (
                    <option key={s.id} value={s.query}>
                      {s.label}
                    </option>
                  ))}
                </datalist>
                <button
                  type="button"
                  onClick={() => setIsVinModalOpen(true)}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                >
                  <Barcode className="w-4 h-4" />
                  <span>По VIN</span>
                </button>
                <button
                  type="submit"
                  className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm"
                >
                  Найти
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={`border-b border-gray-200 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="container mx-auto px-3 sm:px-4">
            <nav className="py-2">
              <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-0">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.path}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <VinSearchModal isOpen={isVinModalOpen} onClose={() => setIsVinModalOpen(false)} />
    </>
  );
};

export default Header;
