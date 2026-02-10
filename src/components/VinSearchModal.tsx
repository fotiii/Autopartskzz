import React, { useState } from 'react';
import { X, Barcode, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VinSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VinSearchModal: React.FC<VinSearchModalProps> = ({ isOpen, onClose }) => {
  const [vinCode, setVinCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSearch = () => {
    const cleanVin = vinCode.trim().toUpperCase();
    
    if (cleanVin.length !== 17) {
      setError('VIN-код должен содержать 17 символов');
      return;
    }

    setError('');
    navigate(`/catalog?vin=${cleanVin}`);
    onClose();
    setVinCode('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
    setVinCode(value.slice(0, 17));
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Barcode className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">Поиск по VIN-коду</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            Введите 17-значный VIN код вашего автомобиля для точного подбора запчастей
          </p>

          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={vinCode}
                onChange={handleInputChange}
                placeholder="Например: JTEBU11F88K007832"
                className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Search className="w-5 h-5" />
                Найти
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-sm text-gray-500 mt-2">{vinCode.length}/17 символов</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">Где найти VIN?</p>
            <ul className="space-y-1.5 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>На лобовом стекле (слева внизу)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>На табличке водительской двери</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>В ПТС или СТС автомобиля</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>На блоке двигателя</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinSearchModal;
