import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Barcode, Car } from 'lucide-react';
import VinSearchModal from './VinSearchModal';
import { apiGet } from '../api';

interface HeaderProps {
  cartCount: number;
}

interface SearchSuggestion {
  id: string;
  label: string;
  query: string;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVinModalOpen, setIsVinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      const lastVehicle = localStorage.getItem('lastVehicle');
      const vehicleKey = lastVehicle ? encodeURIComponent(lastVehicle) : '';

      apiGet<{ suggestions: SearchSuggestion[] }>(
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
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center gap-2 py-2.5 sm:gap-3">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="shrink-0 rounded-lg p-2 hover:bg-gray-100"
                aria-label="Открыть меню"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link to="/" className="min-w-0 shrink flex items-center gap-1.5 sm:gap-2">
                <Car className="h-6 w-6 shrink-0 text-blue-600 sm:h-8 sm:w-8" />
                <span className="truncate text-lg font-bold sm:text-xl">
                  AUTO<span className="text-blue-600">PARTS</span>.KZ
                </span>
              </Link>

              <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setIsVinModalOpen(true)}
                  className="rounded-lg p-2 hover:bg-gray-100 sm:hidden"
                  aria-label="Поиск по VIN"
                >
                  <Barcode className="h-5 w-5" />
                </button>

                <Link
                  to="/account"
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100 sm:px-4 sm:py-2"
                  aria-label="Профиль"
                >
                  <User className="h-5 w-5" />
                </Link>

                <Link
                  to="/cart"
                  className="relative rounded-lg p-2 transition-colors hover:bg-gray-100 sm:px-4 sm:py-2"
                  aria-label="Корзина"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <form onSubmit={handleSearch} className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  list="search-suggestions"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск запчастей, масел, аксессуаров..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:pr-32 sm:text-base"
                />

                <datalist id="search-suggestions">
                  {suggestions.map((suggestion) => (
                    <option key={suggestion.id} value={suggestion.query}>
                      {suggestion.label}
                    </option>
                  ))}
                </datalist>

                <button
                  type="button"
                  onClick={() => setIsVinModalOpen(true)}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-200 sm:flex"
                >
                  <Barcode className="h-4 w-4" />
                  <span>По VIN</span>
                </button>

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white -translate-y-1/2 sm:hidden"
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
              <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-0">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 sm:px-4"
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
