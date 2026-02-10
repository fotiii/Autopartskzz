import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  addToCart: (product: any) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ addToCart }) => {
  const products = [
    {
      id: '1',
      name: 'Mobil 1 ESP 5W-30',
      category: 'Моторное масло',
      price: 12500,
      oldPrice: 14000,
      image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBvaWwlMjBib3R0bGVzfGVufDF8fHx8MTc3MDY0OTg0M3ww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Mobil 1',
      rating: 4.9,
      reviews: 156,
      inStock: true,
      badge: '-11%',
    },
    {
      id: '2',
      name: 'Тормозные колодки передние',
      category: 'Тормозная система',
      price: 8900,
      image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHN5c3RlbSUyMHBhcnRzfGVufDF8fHx8MTc3MDYyNjQxNnww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Brembo',
      rating: 4.8,
      reviews: 89,
      inStock: true,
    },
    {
      id: '3',
      name: 'Аккумулятор 60Ah',
      category: 'Электрооборудование',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1673337188103-c196140adebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5JTIwYXV0b21vdGl2ZXxlbnwxfHx8fDE3NzA2NDUxNTB8MA&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Bosch',
      rating: 4.7,
      reviews: 124,
      inStock: true,
    },
    {
      id: '4',
      name: 'Shell Helix Ultra 5W-40',
      category: 'Моторное масло',
      price: 11800,
      oldPrice: 13500,
      image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBvaWwlMjBib3R0bGVzfGVufDF8fHx8MTc3MDY0OTg0M3ww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Shell',
      rating: 4.8,
      reviews: 203,
      inStock: true,
      badge: '-13%',
    },
    {
      id: '5',
      name: 'Масляный фильтр',
      category: 'Фильтры',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHN5c3RlbSUyMHBhcnRzfGVufDF8fHx8MTc3MDYyNjQxNnww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Mann-Filter',
      rating: 4.6,
      reviews: 67,
      inStock: true,
    },
    {
      id: '6',
      name: 'Воздушный фильтр',
      category: 'Фильтры',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHN5c3RlbSUyMHBhcnRzfGVufDF8fHx8MTc3MDYyNjQxNnww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Bosch',
      rating: 4.7,
      reviews: 45,
      inStock: true,
    },
    {
      id: '7',
      name: 'Castrol GTX 10W-40',
      category: 'Моторное масло',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBvaWwlMjBib3R0bGVzfGVufDF8fHx8MTc3MDY0OTg0M3ww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'Castrol',
      rating: 4.6,
      reviews: 178,
      inStock: true,
    },
    {
      id: '8',
      name: 'Тормозные диски передние',
      category: 'Тормозная система',
      price: 15600,
      image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHN5c3RlbSUyMHBhcnRzfGVufDF8fHx8MTc3MDYyNjQxNnww&ixlib=rb-4.1.0&q=80&w=400',
      brand: 'ATE',
      rating: 4.9,
      reviews: 92,
      inStock: true,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Популярные товары</h2>
          <Link
            to="/catalog"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Смотреть все
            <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
