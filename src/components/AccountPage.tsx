import React, { useEffect, useState } from 'react';
import { User, Package, Heart, MapPin, Settings, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import { apiGet, apiPost } from '../api';

const tabs = [
  { id: 'orders', label: 'Мои заказы', icon: Package },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'addresses', label: 'Адреса', icon: MapPin },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    apiGet<{ orders: any[]; favoriteProducts: any[]; addresses: any[] }>('/account')
      .then((data) => {
        setOrders(data.orders);
        setFavoriteProducts(data.favoriteProducts);
        setAddresses(data.addresses);
      })
      .catch(() => undefined);
  }, []);

  const handleReorder = async (orderId: string) => {
    await apiPost('/orders/reorder', { orderId });
    alert(`Заказ ${orderId} добавлен в корзину`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6"><div className="container mx-auto px-4"><div className="bg-white rounded-lg border p-6 mb-6 flex items-center gap-4"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"><User className="w-8 h-8 text-blue-600" /></div><div><h1 className="text-2xl font-bold">Личный кабинет</h1><p className="text-gray-600">ivan@example.com</p></div></div>
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-white border rounded-lg p-3 h-fit">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg text-left ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-50'}`}><Icon className="w-4 h-4" />{tab.label}</button>; })}</aside>
        <div>
          {activeTab === 'orders' && <div className="space-y-4">{orders.map((order) => <div key={order.id} className="bg-white border rounded-lg p-5"><div className="flex justify-between mb-3"><div><div className="font-semibold">Заказ {order.id}</div><div className="text-sm text-gray-600">{order.date}</div></div><div className="font-bold">{order.total.toLocaleString('ru-RU')} ₸</div></div>{order.items.map((item:any)=><div key={item.id} className="flex items-center gap-3 mb-2"><img src={item.image} className="w-12 h-12 rounded" /><div className="text-sm">{item.name} × {item.quantity}</div></div>)}<button onClick={() => handleReorder(order.id)} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"><RotateCcw className="w-4 h-4" />Повторить заказ</button></div>)}</div>}
          {activeTab === 'favorites' && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{favoriteProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={() => {}} />)}</div>}
          {activeTab === 'addresses' && <div className="space-y-4">{addresses.map((address) => <div key={address.id} className="bg-white border rounded-lg p-5"><div className="font-semibold">{address.name}</div><div>{address.address}</div><div className="text-sm text-gray-600">{address.phone}</div></div>)}</div>}
          {activeTab === 'settings' && <div className="bg-white border rounded-lg p-6">Настройки профиля</div>}
        </div>
      </div>
    </div></div>
  );
};

export default AccountPage;
