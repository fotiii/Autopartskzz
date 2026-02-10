import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { apiGet } from '../api';

interface CatalogPageProps { addToCart: (product: any) => void; selectedVehicle: any; }

const CatalogPage: React.FC<CatalogPageProps> = ({ addToCart, selectedVehicle }) => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [products, setProducts] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({ brands: [], oilTypes: [], volumes: [], filterTypes: [] });
  const [filters, setFilters] = useState({ brands: [] as string[], priceRange: [0, 100000] as [number, number], inStock: false, rating: 0, oilType: '', volume: '', filterType: '' });

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const vin = searchParams.get('vin');
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');
  const year = searchParams.get('year');

  useEffect(() => { apiGet('/catalog/meta').then(setMeta).catch(() => undefined); }, []);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (vin) params.set('vin', vin);
    if (brand) params.set('brand', brand);
    if (model) params.set('model', model);
    if (year) params.set('year', year);
    params.set('sort', sortBy);
    params.set('priceMin', String(filters.priceRange[0]));
    params.set('priceMax', String(filters.priceRange[1]));
    if (filters.brands.length) params.set('brands', filters.brands.join(','));
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.rating) params.set('rating', String(filters.rating));
    if (filters.oilType) params.set('oilType', filters.oilType);
    if (filters.volume) params.set('volume', filters.volume);
    if (filters.filterType) params.set('filterType', filters.filterType);
    return params.toString();
  }, [category, search, vin, brand, model, year, sortBy, filters]);

  useEffect(() => {
    apiGet<{ products: any[] }>(`/products?${queryString}`).then((data) => setProducts(data.products)).catch(() => setProducts([]));
  }, [queryString]);

  const toggleBrand = (value: string) => setFilters((prev) => ({ ...prev, brands: prev.brands.includes(value) ? prev.brands.filter((b) => b !== value) : [...prev.brands, value] }));

  return (
    <div className="bg-gray-50 min-h-screen py-6"><div className="container mx-auto px-4">
      {(selectedVehicle || (brand && model && year)) && <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 font-semibold text-blue-900">Подбор для: {selectedVehicle?.brand || brand} {selectedVehicle?.model || model} {selectedVehicle?.year || year}</div>}
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className={`lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}><div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20 space-y-5">
          <h3 className="text-lg font-semibold flex items-center gap-2"><SlidersHorizontal className="w-5 h-5" />Фильтры</h3>
          <div><h4 className="font-semibold mb-2">Бренд</h4>{meta.brands.map((b: string) => <label key={b} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.brands.includes(b)} onChange={() => toggleBrand(b)} />{b}</label>)}</div>
          <div><h4 className="font-semibold mb-2">Тип масла</h4><select value={filters.oilType} onChange={(e)=>setFilters((p)=>({...p,oilType:e.target.value}))} className="w-full border rounded p-2"><option value="">Все</option>{meta.oilTypes.map((item:string)=><option key={item} value={item}>{item}</option>)}</select></div>
          <div><h4 className="font-semibold mb-2">Объём</h4><select value={filters.volume} onChange={(e)=>setFilters((p)=>({...p,volume:e.target.value}))} className="w-full border rounded p-2"><option value="">Любой</option>{meta.volumes.map((item:string)=><option key={item} value={item}>{item}</option>)}</select></div>
          <div><h4 className="font-semibold mb-2">Тип фильтра</h4><select value={filters.filterType} onChange={(e)=>setFilters((p)=>({...p,filterType:e.target.value}))} className="w-full border rounded p-2"><option value="">Любой</option>{meta.filterTypes.map((item:string)=><option key={item} value={item}>{item}</option>)}</select></div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={filters.inStock} onChange={(e)=>setFilters((p)=>({...p,inStock:e.target.checked}))} />Только в наличии</label>
        </div></aside>
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Каталог</h1><p className="text-gray-600 mt-1">{products.length} товаров</p></div><div className="flex items-center gap-3"><button onClick={() => setShowFilters(!showFilters)} className="lg:hidden px-4 py-2 border rounded">Фильтры</button><select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="px-4 py-2 border rounded"><option value="popular">Популярные</option><option value="price_asc">Цена: по возрастанию</option><option value="price_desc">Цена: по убыванию</option><option value="rating">Рейтинг</option></select></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{products.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
        </div>
      </div>
    </div></div>
  );
};

export default CatalogPage;
