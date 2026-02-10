import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Instagram, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl text-white">
                AUTO<span className="text-blue-500">PARTS</span>.KZ
              </span>
            </div>
            <p className="text-sm mb-4">
              Интернет-магазин автозапчастей с 2015 года. Более 50,000 товаров для всех марок
              автомобилей.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog?category=engine" className="hover:text-blue-400 transition-colors">
                  Двигатель
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=transmission" className="hover:text-blue-400 transition-colors">
                  Трансмиссия
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=suspension" className="hover:text-blue-400 transition-colors">
                  Ходовая часть
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=brakes" className="hover:text-blue-400 transition-colors">
                  Тормозная система
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=electrics" className="hover:text-blue-400 transition-colors">
                  Электрооборудование
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/account" className="hover:text-blue-400 transition-colors">
                  Личный кабинет
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors">
                  Корзина
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Гарантия и возврат
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:+77771234567" className="hover:text-blue-400 transition-colors">
                  +7 (777) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:info@autoparts.kz" className="hover:text-blue-400 transition-colors">
                  info@autoparts.kz
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>г. Алматы, ул. Толе би, 123</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Пн-Сб: 9:00-20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; 2024 AUTOPARTS.KZ. Все права защищены.</p>
          <div className="flex gap-4 text-2xl">
            <span title="Visa">💳</span>
            <span title="Mastercard">💳</span>
            <span title="PayPal">💰</span>
            <span title="Наличные">💵</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
