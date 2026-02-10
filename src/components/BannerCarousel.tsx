import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiGet } from '../api';

interface BannerSlide {
  id: number;
  title: string;
  description: string;
  cta: string;
  link: string;
  image: string;
}

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<BannerSlide[]>([]);

  useEffect(() => {
    apiGet<{ banners: BannerSlide[] }>('/home')
      .then((data) => setSlides(data.banners))
      .catch(() => setSlides([]));
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides.length) return null;

  return (
    <section className="bg-white py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative h-56 sm:h-64 md:h-96">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
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

                <div className="relative flex h-full items-center">
                  <div className="container mx-auto px-4 sm:px-8 md:px-16">
                    <div className="max-w-xl">
                      <h3 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl md:text-5xl">
                        {slide.title}
                      </h3>
                      <p className="mb-4 text-base text-gray-200 sm:mb-6 sm:text-lg md:text-xl">
                        {slide.description}
                      </p>
                      <Link
                        to={slide.link}
                        className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:px-8 sm:py-3 sm:text-base"
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
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white sm:left-4 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white sm:right-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
