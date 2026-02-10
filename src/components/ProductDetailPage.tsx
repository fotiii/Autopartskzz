import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import { apiGet } from '../api';

interface ProductDetailPageProps { addToCart: (product: any) => void; }

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ addToCart }) => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => { if (id) apiGet(`/products/${id}`).then(setProduct).catch(() => setProduct(null)); }, [id]);
  if (!product) return <div className="p-8">Загрузка...</div>;

  const handleAddToCart = () => addToCart({ ...product, quantity });

  return (
    <div className="bg-gray-50 min-h-screen py-6"><div className="container mx-auto px-4">
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6"><Link to="/">Главная</Link><ChevronRight className="w-4 h-4" /><Link to="/catalog">Каталог</Link><ChevronRight className="w-4 h-4" /><span>{product.name}</span></nav>
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4"><div className="bg-white rounded-lg border overflow-hidden aspect-square"><img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" /></div><div className="grid grid-cols-3 gap-4">{product.images.map((image: string, index: number) => <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg border-2 overflow-hidden ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`}><img src={image} alt="" className="w-full h-full object-cover" /></button>)}</div></div>
        <div className="bg-white rounded-lg border p-6"><div className="flex items-start justify-between mb-4"><div><div className="text-sm text-gray-500">{product.brand}</div><h1 className="text-3xl font-bold">{product.name}</h1><div className="text-sm text-gray-500">Артикул: {product.sku}</div></div><button onClick={() => setIsFavorite(!isFavorite)}><Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} /></button></div><div className="text-3xl font-bold mb-4">{product.price.toLocaleString('ru-RU')} ₸</div><div className="mb-4 text-green-600 flex items-center gap-2"><Check className="w-5 h-5" />В наличии</div><div className="flex items-center gap-4 mb-6"><div className="flex items-center border rounded-lg"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2">-</button><div className="px-4 py-2 border-x">{quantity}</div><button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">+</button></div><button onClick={handleAddToCart} className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"><ShoppingCart className="w-5 h-5" />Добавить в корзину</button></div><div className="grid grid-cols-3 gap-4 pt-6 border-t"><div className="text-center"><Truck className="w-8 h-8 text-blue-600 mx-auto" /><div className="text-xs">Доставка 1-2 дня</div></div><div className="text-center"><Shield className="w-8 h-8 text-blue-600 mx-auto" /><div className="text-xs">Гарантия качества</div></div><div className="text-center"><RotateCcw className="w-8 h-8 text-blue-600 mx-auto" /><div className="text-xs">Возврат 14 дней</div></div></div></div>
      </div>
      <div className="bg-white rounded-lg border mb-12"><div className="border-b"><div className="flex gap-8 px-6">{[{ id: 'description', label: 'Описание' }, { id: 'specifications', label: 'Характеристики' }, { id: 'compatibility', label: 'Совместимость' }, { id: 'reviews', label: 'Отзывы' }].map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 font-medium ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'}`}>{tab.label}</button>)}</div></div>
        <div className="p-6">{activeTab === 'description' && <p>{product.description}</p>}
          {activeTab === 'specifications' && <div className="grid md:grid-cols-2 gap-4">{product.specifications.map((spec: any, index: number) => <div key={index} className="flex justify-between py-3 border-b"><span>{spec.label}</span><span>{spec.value}</span></div>)}</div>}
          {activeTab === 'compatibility' && <div className="space-y-6"><h3 className="font-semibold">Таблица совместимости</h3><table className="w-full text-sm border"><thead><tr className="bg-gray-50"><th className="p-2 border">Марка</th><th className="p-2 border">Модель</th><th className="p-2 border">Годы</th><th className="p-2 border">Двигатель</th></tr></thead><tbody>{product.compatibilityTable.map((row:any,idx:number)=><tr key={idx}><td className="border p-2">{row.brand}</td><td className="border p-2">{row.model}</td><td className="border p-2">{row.years}</td><td className="border p-2">{row.engine}</td></tr>)}</tbody></table><h3 className="font-semibold">Подходит для таких автомобилей</h3><div className="grid md:grid-cols-2 gap-3">{product.suitableVehicles.map((vehicle:string, index:number) => <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"><Check className="w-5 h-5 text-green-600" /><span>{vehicle}</span></div>)}</div></div>}
          {activeTab === 'reviews' && <div className="space-y-6">{product.reviews.map((review:any) => <div key={review.id} className="pb-6 border-b"><div className="font-semibold">{review.author}</div><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div><p>{review.text}</p></div>)}</div>}
        </div>
      </div>
      <div><h2 className="text-2xl font-bold text-gray-900 mb-6">С этим покупают</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{product.relatedProducts.map((item:any) => <ProductCard key={item.id} product={item} addToCart={addToCart} />)}</div></div>
    </div></div>
  );
};

export default ProductDetailPage;
