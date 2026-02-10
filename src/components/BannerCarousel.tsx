import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiGet } from '../api';

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    apiGet<{ banners: any[] }>('/home').then((data) => setSlides(data.banners)).catch(() => setSlides([]));
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  if (!slides.length) return null;

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-64 md:h-96">
            {slides.map((slide, index) => (
              <div key={slide.id} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}><div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" /></div>
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-8 md:px-16"><div className="max-w-xl"><h3 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h3><p className="text-lg md:text-xl text-gray-200 mb-6">{slide.description}</p><Link to={slide.link} className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">{slide.cta}</Link></div></div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"><ChevronRight className="w-6 h-6" /></button>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
