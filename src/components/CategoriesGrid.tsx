import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Filter, CircleDot, Battery, Wrench, Lightbulb } from 'lucide-react';

const CategoriesGrid: React.FC = () => {
  const categories = [
    {
      name: 'Масла и жидкости',
      description: 'Моторное, трансмиссионное, тормозное',
      icon: Droplet,
      count: 154,
      link: '/catalog?category=oils',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      name: 'Фильтры',
      description: 'Воздушные, масляные, салонные',
      icon: Filter,
      count: 89,
      link: '/catalog?category=filters',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Тормозная система',
      description: 'Колодки, диски, суппорты',
      icon: CircleDot,
      count: 203,
      link: '/catalog?category=brakes',
      color: 'bg-red-100 text-red-600',
    },
    {
      name: 'Аккумуляторы',
      description: 'Для всех марок автомобилей',
      icon: Battery,
      count: 67,
      link: '/catalog?category=battery',
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'Подвеска',
      description: 'Амортизаторы, пружины, сайлентблоки',
      icon: Wrench,
      count: 312,
      link: '/catalog?category=suspension',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'Освещение',
      description: 'Лампы, фары, поворотники',
      icon: Lightbulb,
      count: 178,
      link: '/catalog?category=lighting',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Популярные категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                to={category.link}
                className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <span className="text-sm font-medium text-gray-500">
                      {category.count} товаров
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
