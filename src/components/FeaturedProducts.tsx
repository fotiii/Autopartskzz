import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { apiGet } from '../api';

interface FeaturedProductsProps {
  addToCart: (product: any) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    apiGet<{ featuredProducts: any[] }>('/home').then((data) => setProducts(data.featuredProducts)).catch(() => setProducts([]));
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Популярные товары</h2>
          <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Смотреть все <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
