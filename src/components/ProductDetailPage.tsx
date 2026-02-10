import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';

interface ProductDetailPageProps {
  addToCart: (product: any) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ addToCart }) => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id,
    name: 'Mobil 1 ESP 5W-30',
    brand: 'Mobil 1',
    category: 'Моторное масло',
    price: 12500,
    oldPrice: 14000,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    sku: 'MOB-ESP-5W30-4L',
    images: [
      'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=800',
      'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=800',
      'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=800',
    ],
    description: `Полностью синтетическое моторное масло премиум класса. 
      Обеспечивает превосходную защиту двигателя и очистку от отложений. 
      Разработано для современных бензиновых и дизельных двигателей с системами нейтрализации отработавших газов.`,
    specifications: [
      { label: 'Объем', value: '4 литра' },
      { label: 'Вязкость SAE', value: '5W-30' },
      { label: 'Тип', value: 'Синтетическое' },
      { label: 'Спецификации', value: 'API SN, ACEA C3' },
      { label: 'Допуски', value: 'BMW LL-04, MB 229.51, VW 504.00/507.00' },
      { label: 'Страна производства', value: 'Финляндия' },
    ],
    compatibleVehicles: [
      'BMW 3 Series (2015-2024)',
      'Mercedes-Benz C-Class (2014-2024)',
      'Audi A4 (2016-2024)',
      'Volkswagen Passat (2015-2024)',
      'Toyota Camry (2018-2024)',
    ],
  };

  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    id: `rel-${i + 1}`,
    name: `Похожий товар ${i + 1}`,
    category: 'Моторное масло',
    price: Math.floor(Math.random() * 20000) + 8000,
    image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=400',
    brand: 'Shell',
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 100) + 20,
    inStock: true,
  }));

  const reviews = [
    {
      id: 1,
      author: 'Александр М.',
      rating: 5,
      date: '15 января 2024',
      text: 'Отличное масло, двигатель работает тихо и плавно. Рекомендую!',
      vehicle: 'BMW 320i 2018',
    },
    {
      id: 2,
      author: 'Дмитрий К.',
      rating: 5,
      date: '10 января 2024',
      text: 'Использую уже 3 года, никаких нареканий. Качество на высоте.',
      vehicle: 'Audi A4 2016',
    },
    {
      id: 3,
      author: 'Сергей П.',
      rating: 4,
      date: '5 января 2024',
      text: 'Хорошее масло, но цена могла бы быть ниже.',
      vehicle: 'Mercedes C200 2019',
    },
  ];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/catalog" className="hover:text-blue-600">Каталог</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/catalog?category=${product.category}`} className="hover:text-blue-600">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="text-sm text-gray-500">Артикул: {product.sku}</div>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} отзывов)
              </span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <div className="text-4xl font-bold text-gray-900">
                {product.price.toLocaleString('ru-RU')} ₸
              </div>
              {product.oldPrice && (
                <>
                  <div className="text-xl text-gray-500 line-through mb-1">
                    {product.oldPrice.toLocaleString('ru-RU')} ₸
                  </div>
                  <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold mb-1">
                    -11%
                  </div>
                </>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-green-600 font-medium mb-2">
                <Check className="w-5 h-5" />
                В наличии
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <div className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                Добавить в корзину
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-xs font-medium">Доставка 1-2 дня</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-xs font-medium">Гарантия качества</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-xs font-medium">Возврат 14 дней</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              {[
                { id: 'description', label: 'Описание' },
                { id: 'specifications', label: 'Характеристики' },
                { id: 'compatibility', label: 'Совместимость' },
                { id: 'reviews', label: 'Отзывы' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-700">{spec.label}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Подходит для автомобилей:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {product.compatibleVehicles.map((vehicle, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-600 shrink-0" />
                      <span>{vehicle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.vehicle}</div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">С этим покупают</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
