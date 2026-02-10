import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Filter, CircleDot, Battery, Wrench, Lightbulb } from 'lucide-react';
import { apiGet } from '../api';

const iconMap: Record<string, any> = {
  oils: Droplet,
  filters: Filter,
  brakes: CircleDot,
  battery: Battery,
  suspension: Wrench,
  lighting: Lightbulb,
};

const CategoriesGrid: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    apiGet<{ categories: any[] }>('/home').then((data) => setCategories(data.categories)).catch(() => setCategories([]));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Популярные категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.id] || Wrench;
            return (
              <Link key={category.id} to={`/catalog?category=${category.id}`} className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <span className="text-sm font-medium text-gray-500">{category.count} товаров</span>
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
