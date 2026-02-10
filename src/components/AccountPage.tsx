import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '5 февраля 2024',
      status: 'delivered',
      statusText: 'Доставлен',
      total: 25600,
      items: [
        {
          id: '1',
          name: 'Mobil 1 ESP 5W-30',
          image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=200',
          quantity: 2,
          price: 12500,
        },
      ],
    },
    {
      id: 'ORD-2024-002',
      date: '28 января 2024',
      status: 'processing',
      statusText: 'В обработке',
      total: 15600,
      items: [
        {
          id: '2',
          name: 'Тормозные диски передние',
          image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?w=200',
          quantity: 1,
          price: 15600,
        },
      ],
    },
  ];

  const favoriteProducts = Array.from({ length: 4 }, (_, i) => ({
    id: `fav-${i + 1}`,
    name: `Избранный товар ${i + 1}`,
    category: 'Моторное масло',
    price: Math.floor(Math.random() * 20000) + 8000,
    image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=400',
    brand: 'Shell',
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 100) + 20,
    inStock: true,
  }));

  const addresses = [
    {
      id: 1,
      name: 'Дом',
      address: 'г. Алматы, ул. Абая, 123, кв. 45',
      phone: '+7 (777) 123-45-67',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Работа',
      address: 'г. Алматы, пр. Достык, 456, офис 12',
      phone: '+7 (777) 123-45-67',
      isDefault: false,
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleReorder = (orderId: string) => {
    alert(`Повторить заказ ${orderId}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Вход в аккаунт</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+7 (777) 123-45-67"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Войти
              </button>
            </form>
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Забыли пароль?
              </a>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Нет аккаунта? </span>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Зарегистрироваться
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Личный кабинет</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Иван Иванов</div>
                  <div className="text-sm text-gray-600">+7 (777) 123-45-67</div>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'orders', label: 'Мои заказы', icon: Package },
                  { id: 'favorites', label: 'Избранное', icon: Heart },
                  { id: 'addresses', label: 'Адреса доставки', icon: MapPin },
                  { id: 'settings', label: 'Настройки', icon: Settings },
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Выйти
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">История заказов</h2>
                  <span className="text-gray-600">{orders.length} заказов</span>
                </div>

                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">Заказ {order.id}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.statusText}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {order.total.toLocaleString('ru-RU')} ₸
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">Количество: {item.quantity}</div>
                          </div>
                          <div className="font-semibold">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleReorder(order.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Повторить заказ
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Детали заказа
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Избранное</h2>
                  <span className="text-gray-600">{favoriteProducts.length} товаров</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProducts.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={() => {}} />
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Адреса доставки</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Добавить адрес
                  </button>
                </div>

                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white rounded-lg border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{address.name}</h3>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              По умолчанию
                            </span>
                          )}
                        </div>
                        <div className="text-gray-700 mb-1">{address.address}</div>
                        <div className="text-sm text-gray-600">{address.phone}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Редактировать
                      </button>
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Настройки профиля</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя и фамилия
                    </label>
                    <input
                      type="text"
                      defaultValue="Иван Иванов"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Номер телефона
                    </label>
                    <input
                      type="tel"
                      defaultValue="+7 (777) 123-45-67"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="ivan@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Сохранить изменения
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
