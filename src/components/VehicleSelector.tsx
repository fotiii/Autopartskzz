import React, { useState } from 'react';
import { Car, Barcode, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VehicleSelectorProps {
  onVinClick: () => void;
  onVehicleSelect?: (vehicle: any) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ onVinClick, onVehicleSelect }) => {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const brands = [
    'Toyota', 'Lexus', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
    'Hyundai', 'KIA', 'Nissan', 'Mitsubishi', 'Honda', 'Mazda'
  ];

  const modelsByBrand: { [key: string]: string[] } = {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Highlander', 'Prius'],
    'Lexus': ['RX', 'NX', 'ES', 'GX', 'LX', 'IS'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X7', '7 Series'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'A-Class'],
    'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3'],
    'Volkswagen': ['Polo', 'Golf', 'Tiguan', 'Passat', 'Jetta', 'Touareg'],
    'Hyundai': ['Solaris', 'Elantra', 'Tucson', 'Santa Fe', 'Creta', 'Sonata'],
    'KIA': ['Rio', 'Sportage', 'Sorento', 'Cerato', 'Seltos', 'K5'],
    'Nissan': ['Qashqai', 'X-Trail', 'Juke', 'Patrol', 'Murano', 'Almera'],
    'Mitsubishi': ['Outlander', 'ASX', 'Pajero', 'Lancer', 'Eclipse Cross'],
  };

  const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());

  const handleBrandSelect = (selectedBrand: string) => {
    setBrand(selectedBrand);
    setModel('');
    setYear('');
    setStep(2);
  };

  const handleModelSelect = (selectedModel: string) => {
    setModel(selectedModel);
    setYear('');
    setStep(3);
  };

  const handleYearSelect = (selectedYear: string) => {
    setYear(selectedYear);
  };

  const handleFindParts = () => {
    if (brand && model && year) {
      const vehicle = { brand, model, year };
      if (onVehicleSelect) {
        onVehicleSelect(vehicle);
      }
      navigate(`/catalog?brand=${brand}&model=${model}&year=${year}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Car className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Подбор по автомобилю
              </h2>
            </div>
            <p className="text-gray-600">Найдите запчасти именно для вашей машины</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">Марка</span>
              </div>
              <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">Модель</span>
              </div>
              <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium hidden sm:inline">Год</span>
              </div>
            </div>

            {/* Step 1: Brand Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Выберите марку автомобиля</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => handleBrandSelect(b)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all font-medium text-center"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Model Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Выберите модель {brand}</h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Изменить марку
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(modelsByBrand[brand] || []).map((m) => (
                    <button
                      key={m}
                      onClick={() => handleModelSelect(m)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all font-medium text-center"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Year Selection */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Выберите год {brand} {model}</h3>
                  <button
                    onClick={() => setStep(2)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Изменить модель
                  </button>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => handleYearSelect(y)}
                      className={`p-3 border-2 rounded-lg font-medium text-center transition-all ${
                        year === y
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                {year && (
                  <button
                    onClick={handleFindParts}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    Найти запчасти
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* VIN Search Alternative */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <button
                onClick={onVinClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                <Barcode className="w-5 h-5" />
                Подбор по VIN-коду
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Введите VIN автомобиля для точного подбора
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleSelector;
