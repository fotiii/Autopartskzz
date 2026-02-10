import React, { useEffect, useState } from 'react';
import { Car, Barcode, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../api';

interface VehicleSelectorProps {
  onVinClick: () => void;
  onVehicleSelect?: (vehicle: any) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ onVinClick, onVehicleSelect }) => {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiGet<{ brands: string[] }>('/vehicles/brands').then((d) => setBrands(d.brands));
    apiGet<{ years: string[] }>('/vehicles/years').then((d) => setYears(d.years));
  }, []);

  useEffect(() => {
    if (!brand) return;
    apiGet<{ models: string[] }>(`/vehicles/models?brand=${encodeURIComponent(brand)}`).then((d) =>
      setModels(d.models),
    );
  }, [brand]);

  const handleFindParts = () => {
    if (!(brand && model && year)) return;

    const vehicle = { brand, model, year };
    localStorage.setItem('lastVehicle', JSON.stringify(vehicle));
    onVehicleSelect?.(vehicle);
    navigate(`/catalog?brand=${brand}&model=${model}&year=${year}`);
  };

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-5 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="rounded-xl bg-white p-4 shadow-xl sm:p-6 md:p-8">
          <div className="mb-5 text-center sm:mb-6">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Car className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Подбор по автомобилю</h2>
            </div>
            <p className="text-sm text-gray-600 sm:text-base">Найдите запчасти именно для вашей машины</p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-center sm:mb-8">
              {[1, 2, 3].map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
                        step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                  </div>
                  {i < 2 && (
                    <div
                      className={`h-0.5 w-10 sm:w-12 ${
                        step >= s + 1 ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setBrand(b);
                      setStep(2);
                      setModel('');
                      setYear('');
                    }}
                    className="break-words rounded-lg border-2 border-gray-200 p-3 text-center text-sm font-medium transition-all hover:border-blue-600 hover:bg-blue-50 sm:p-4 sm:text-base"
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 sm:text-base"
                >
                  Изменить марку
                </button>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
                  {models.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setModel(m);
                        setStep(3);
                      }}
                      className="break-words rounded-lg border-2 border-gray-200 p-3 text-sm transition-all hover:border-blue-600 hover:bg-blue-50 sm:p-4 sm:text-base"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-blue-600 sm:text-base"
                >
                  Изменить модель
                </button>
                <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className={`rounded-lg border-2 p-2.5 text-center text-sm font-medium transition-all sm:p-3 sm:text-base ${
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
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700 sm:py-4 sm:text-lg"
                  >
                    Найти запчасти
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-8 text-center">
              <button
                onClick={onVinClick}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-medium transition-colors hover:bg-gray-200"
              >
                <Barcode className="h-5 w-5" />
                Подбор по VIN-коду
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleSelector;
