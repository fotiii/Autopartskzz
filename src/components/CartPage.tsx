import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { apiPost } from '../api';

interface CartPageProps {
  cartItems: any[];
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, updateQuantity, removeItem }) => {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    type: 'courier',
    address: '',
    city: 'Алматы',
    comment: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [recommendationMessage, setRecommendationMessage] = useState('');

  useEffect(() => {
    apiPost<{ recommendations: any[]; message: string }>('/cart/recommendations', { items: cartItems })
      .then((data) => {
        setRecommendedProducts(data.recommendations);
        setRecommendationMessage(data.message);
      })
      .catch(() => {
        setRecommendedProducts([]);
        setRecommendationMessage('');
      });
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = deliveryInfo.type === 'courier' ? 1000 : 0;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert('Заказ оформлен! Спасибо за покупку.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Корзина</h1>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <span className="text-xs sm:text-sm font-medium">Контакты</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <span className="text-xs sm:text-sm font-medium">Доставка</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
              <span className="text-xs sm:text-sm font-medium">Оплата</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Contact Info */}
            {step === 1 && (
              <>
                {/* Cart Items */}
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex gap-3 sm:gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg line-clamp-2">{item.name}</h3>
                          <div className="text-sm text-gray-600 mb-2">{item.brand}</div>
                          <div className="text-lg font-bold text-gray-900">
                            {item.price.toLocaleString('ru-RU')} ₸
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="self-start p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Контактные данные</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Имя и фамилия
                      </label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+7 (777) 123-45-67"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ivan@example.com"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Способ доставки</h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="courier"
                      checked={deliveryInfo.type === 'courier'}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, type: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Курьерская доставка</div>
                      <div className="text-sm text-gray-600">1-2 рабочих дня</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">1,000 ₸</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={deliveryInfo.type === 'pickup'}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, type: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Самовывоз</div>
                      <div className="text-sm text-gray-600">г. Алматы, ул. Толе би, 123</div>
                      <div className="text-sm font-medium text-green-600 mt-1">Бесплатно</div>
                    </div>
                  </label>
                </div>

                {deliveryInfo.type === 'courier' && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                      <input
                        type="text"
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
                      <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) =>
                          setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Улица, дом, квартира"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Комментарий к заказу
                      </label>
                      <textarea
                        value={deliveryInfo.comment}
                        onChange={(e) =>
                          setDeliveryInfo({ ...deliveryInfo, comment: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Дополнительная информация для курьера"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Способ оплаты</h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Банковская карта онлайн</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Наличные при получении</div>
                      <div className="text-sm text-gray-600">Оплата курьеру</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="kaspi"
                      checked={paymentMethod === 'kaspi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Kaspi QR</div>
                      <div className="text-sm text-gray-600">Оплата через Kaspi.kz</div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Итого</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({cartItems.length})</span>
                  <span>{subtotal.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span>{delivery === 0 ? 'Бесплатно' : `${delivery.toLocaleString('ru-RU')} ₸`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
                  <span>Итого</span>
                  <span>{total.toLocaleString('ru-RU')} ₸</span>
                </div>
              </div>

              <div className="space-y-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="w-full py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Назад
                  </button>
                )}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {step === 3 ? 'Оформить заказ' : 'Продолжить'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {step === 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Рекомендуем добавить</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={() => {}} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
