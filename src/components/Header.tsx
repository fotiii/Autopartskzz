import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Barcode, Car } from 'lucide-react';
import VinSearchModal from './VinSearchModal';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVinModalOpen, setIsVinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3 gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2 shrink-0">
                <Car className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">
                  AUTO<span className="text-blue-600">PARTS</span>.KZ
                </span>
              </Link>

              <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск запчастей, масел, аксессуаров..."
                    className="w-full pl-10 pr-32 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsVinModalOpen(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                  >
                    <Barcode className="w-4 h-4" />
                    <span className="hidden sm:inline">По VIN</span>
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">Войти</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden md:inline">Корзина</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-b border-gray-200 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="container mx-auto px-4">
            <nav className="py-2">
              <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-0">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.path}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm"
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
