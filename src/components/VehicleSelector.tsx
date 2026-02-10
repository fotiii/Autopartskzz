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

  useEffect(() => { apiGet<{ brands: string[] }>('/vehicles/brands').then((d) => setBrands(d.brands)); apiGet<{ years: string[] }>('/vehicles/years').then((d) => setYears(d.years)); }, []);
  useEffect(() => { if (brand) apiGet<{ models: string[] }>(`/vehicles/models?brand=${encodeURIComponent(brand)}`).then((d) => setModels(d.models)); }, [brand]);

  const handleFindParts = () => {
    if (brand && model && year) {
      const vehicle = { brand, model, year };
      localStorage.setItem('lastVehicle', JSON.stringify(vehicle));
      onVehicleSelect?.(vehicle);
      navigate(`/catalog?brand=${brand}&model=${model}&year=${year}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-8">
      <div className="container mx-auto px-4"><div className="bg-white rounded-xl shadow-xl p-6 md:p-8"><div className="text-center mb-6"><div className="flex items-center justify-center gap-2 mb-2"><Car className="w-8 h-8 text-blue-600" /><h2 className="text-2xl md:text-3xl font-bold text-gray-900">Подбор по автомобилю</h2></div><p className="text-gray-600">Найдите запчасти именно для вашей машины</p></div>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">{[1,2,3].map((s,i)=><React.Fragment key={s}><div className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step>=s?'bg-blue-600 text-white':'bg-gray-200 text-gray-500'}`}>{s}</div></div>{i<2&&<div className={`w-12 h-0.5 ${step>=s+1?'bg-blue-600':'bg-gray-200'}`} />}</React.Fragment>)}</div>
        {step===1&&<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{brands.map((b)=><button key={b} onClick={()=>{setBrand(b);setStep(2);setModel('');setYear('');}} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all font-medium text-center">{b}</button>)}</div>}
        {step===2&&<div className="space-y-4"><button onClick={()=>setStep(1)} className="text-blue-600">Изменить марку</button><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{models.map((m)=><button key={m} onClick={()=>{setModel(m);setStep(3);}} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all">{m}</button>)}</div></div>}
        {step===3&&<div className="space-y-4"><button onClick={()=>setStep(2)} className="text-blue-600">Изменить модель</button><div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">{years.map((y)=><button key={y} onClick={()=>setYear(y)} className={`p-3 border-2 rounded-lg font-medium text-center transition-all ${year===y?'border-blue-600 bg-blue-50 text-blue-600':'border-gray-200 hover:border-blue-600 hover:bg-blue-50'}`}>{y}</button>)}</div>{year&&<button onClick={handleFindParts} className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2">Найти запчасти<ChevronRight className="w-5 h-5" /></button>}</div>}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center"><button onClick={onVinClick} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"><Barcode className="w-5 h-5" />Подбор по VIN-коду</button></div>
      </div>
      </div></div>
    </section>
  );
};

export default VehicleSelector;
