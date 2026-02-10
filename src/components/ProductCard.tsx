import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Check } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    image: string;
    brand: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    badge?: string;
  };
  addToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {product.badge}
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-lg font-semibold">Нет в наличии</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="text-sm text-gray-600 mb-2">{product.brand}</div>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-end gap-2 mb-3">
          <div className="text-2xl font-bold text-gray-900">
            {product.price.toLocaleString('ru-RU')} ₸
          </div>
          {product.oldPrice && (
            <div className="text-sm text-gray-500 line-through mb-1">
              {product.oldPrice.toLocaleString('ru-RU')} ₸
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isAdded
              ? 'bg-green-500 text-white'
              : product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              Добавлено
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              В корзину
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
