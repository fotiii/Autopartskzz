import React, { useState } from 'react';
import VehicleSelector from './VehicleSelector';
import BannerCarousel from './BannerCarousel';
import CategoriesGrid from './CategoriesGrid';
import FeaturedProducts from './FeaturedProducts';
import VinSearchModal from './VinSearchModal';

interface HomePageProps {
  addToCart: (product: any) => void;
  selectedVehicle: any;
  setSelectedVehicle: (vehicle: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addToCart, selectedVehicle, setSelectedVehicle }) => {
  const [isVinModalOpen, setIsVinModalOpen] = useState(false);

  return (
    <div>
      <VehicleSelector 
        onVinClick={() => setIsVinModalOpen(true)}
        onVehicleSelect={setSelectedVehicle}
      />
      <BannerCarousel />
      <CategoriesGrid />
      <FeaturedProducts addToCart={addToCart} />
      <VinSearchModal isOpen={isVinModalOpen} onClose={() => setIsVinModalOpen(false)} />
    </div>
  );
};

export default HomePage;
