import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBvaWwlMjBib3R0bGVzfGVufDF8fHx8MTc3MDY0OTg0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Моторные масла со скидкой 20%',
      description: 'Только до конца месяца! Mobil, Shell, Castrol',
      link: '/catalog?category=oils&sale=true',
      cta: 'Смотреть',
    },
    {
      image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHN5c3RlbSUyMHBhcnRzfGVufDF8fHx8MTc3MDYyNjQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Тормозные системы',
      description: 'Колодки, диски, тормозная жидкость',
      link: '/catalog?category=brakes',
      cta: 'Выбрать',
    },
    {
      image: 'https://images.unsplash.com/photo-1673337188103-c196140adebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5JTIwYXV0b21vdGl2ZXxlbnwxfHx8fDE3NzA2NDUxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Аккумуляторы для авто',
      description: 'Зимняя распродажа аккумуляторов',
      link: '/catalog?category=electrics',
      cta: 'Купить',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <div className="relative h-64 md:h-96">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                </div>
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-xl">
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {slide.title}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-200 mb-6">
                        {slide.description}
                      </p>
                      <Link
                        to={slide.link}
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
