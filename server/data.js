const categories = [
  { id: 'oils', name: 'Масла и жидкости', description: 'Моторное, трансмиссионное, тормозное', count: 154, color: 'bg-amber-100 text-amber-600' },
  { id: 'filters', name: 'Фильтры', description: 'Воздушные, масляные, салонные', count: 89, color: 'bg-blue-100 text-blue-600' },
  { id: 'brakes', name: 'Тормозная система', description: 'Колодки, диски, суппорты', count: 203, color: 'bg-red-100 text-red-600' },
  { id: 'battery', name: 'Аккумуляторы', description: 'Для всех марок автомобилей', count: 67, color: 'bg-green-100 text-green-600' },
  { id: 'suspension', name: 'Подвеска', description: 'Амортизаторы, пружины, сайлентблоки', count: 312, color: 'bg-purple-100 text-purple-600' },
  { id: 'lighting', name: 'Освещение', description: 'Лампы, фары, поворотники', count: 178, color: 'bg-yellow-100 text-yellow-600' },
];

const banners = [
  { id: 1, title: 'Сезонная замена масла', description: 'Скидки до 20% на топовые бренды масел', cta: 'Выбрать масло', link: '/catalog?category=oils', image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=1600' },
  { id: 2, title: 'Тормозная система', description: 'Колодки и диски с гарантией совместимости', cta: 'Перейти в каталог', link: '/catalog?category=brakes', image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?w=1600' },
  { id: 3, title: 'АКБ для любых авто', description: 'Быстрый подбор аккумуляторов по марке и модели', cta: 'Подобрать аккумулятор', link: '/catalog?category=battery', image: 'https://images.unsplash.com/photo-1673337188103-c196140adebd?w=1600' },
];

const brands = ['Mobil 1', 'Shell', 'Castrol', 'Bosch', 'Brembo', 'Mann-Filter', 'ATE', 'Total', 'Liqui Moly'];
const vehicles = {
  Toyota: ['Camry', 'Corolla', 'RAV4'],
  BMW: ['3 Series', '5 Series', 'X5'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE'],
  Audi: ['A4', 'A6', 'Q5'],
  Volkswagen: ['Passat', 'Golf', 'Tiguan'],
};

const years = Array.from({ length: 20 }, (_, i) => String(2025 - i));

const products = [
  { id: '1', name: 'Mobil 1 ESP 5W-30', category: 'oils', categoryName: 'Моторное масло', price: 12500, oldPrice: 14000, image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=800', brand: 'Mobil 1', rating: 4.9, reviews: 156, inStock: true, badge: '-11%', oilType: 'synthetic', volume: '4L', compatibility: ['BMW 3 Series 2015-2024', 'Audi A4 2016-2024'], filterType: null, sku: 'MOB-ESP-5W30-4L', description: 'Полностью синтетическое моторное масло премиум класса.', specifications: [{ label: 'Объем', value: '4 литра' }, { label: 'Вязкость SAE', value: '5W-30' }, { label: 'Тип', value: 'Синтетическое' }], compatibilityTable: [{ brand: 'BMW', model: '3 Series', years: '2015-2024', engine: '2.0 бензин' }, { brand: 'Audi', model: 'A4', years: '2016-2024', engine: '2.0 TFSI' }], suitableVehicles: ['BMW 3 Series (2015-2024)', 'Audi A4 (2016-2024)'] },
  { id: '2', name: 'Shell Helix Ultra 5W-40', category: 'oils', categoryName: 'Моторное масло', price: 11800, oldPrice: 13500, image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=801', brand: 'Shell', rating: 4.8, reviews: 203, inStock: true, badge: '-13%', oilType: 'synthetic', volume: '4L', compatibility: ['Toyota Camry 2018-2024'], filterType: null, sku: 'SHELL-HELIX-5W40', description: 'Синтетическое масло для бензиновых и дизельных двигателей.', specifications: [{ label: 'Объем', value: '4 литра' }, { label: 'Вязкость SAE', value: '5W-40' }, { label: 'Тип', value: 'Синтетическое' }], compatibilityTable: [{ brand: 'Toyota', model: 'Camry', years: '2018-2024', engine: '2.5 бензин' }], suitableVehicles: ['Toyota Camry (2018-2024)'] },
  { id: '3', name: 'Тормозные колодки передние Brembo', category: 'brakes', categoryName: 'Тормозная система', price: 8900, image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?w=802', brand: 'Brembo', rating: 4.8, reviews: 89, inStock: true, oilType: null, volume: null, filterType: 'brake', compatibility: ['BMW 5 Series 2017-2024'], sku: 'BRE-PAD-FRONT-5', description: 'Керамические передние тормозные колодки.', specifications: [{ label: 'Позиция', value: 'Передняя ось' }], compatibilityTable: [{ brand: 'BMW', model: '5 Series', years: '2017-2024', engine: 'Все' }], suitableVehicles: ['BMW 5 Series (2017-2024)'] },
  { id: '4', name: 'Масляный фильтр Mann-Filter', category: 'filters', categoryName: 'Фильтры', price: 1200, image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?w=803', brand: 'Mann-Filter', rating: 4.6, reviews: 67, inStock: true, oilType: null, volume: null, filterType: 'oil', compatibility: ['Toyota Corolla 2016-2024'], sku: 'MANN-OF-123', description: 'Оригинальный масляный фильтр.', specifications: [{ label: 'Тип фильтра', value: 'Масляный' }], compatibilityTable: [{ brand: 'Toyota', model: 'Corolla', years: '2016-2024', engine: '1.6' }], suitableVehicles: ['Toyota Corolla (2016-2024)'] },
  { id: '5', name: 'Воздушный фильтр Bosch', category: 'filters', categoryName: 'Фильтры', price: 1800, image: 'https://images.unsplash.com/photo-1758563920433-027318cc48a0?w=804', brand: 'Bosch', rating: 4.7, reviews: 45, inStock: true, oilType: null, volume: null, filterType: 'air', compatibility: ['Volkswagen Passat 2015-2024'], sku: 'BOS-AF-552', description: 'Воздушный фильтр повышенной очистки.', specifications: [{ label: 'Тип фильтра', value: 'Воздушный' }], compatibilityTable: [{ brand: 'Volkswagen', model: 'Passat', years: '2015-2024', engine: '2.0 TSI' }], suitableVehicles: ['Volkswagen Passat (2015-2024)'] },
  { id: '6', name: 'Аккумулятор Bosch S4 60Ah', category: 'battery', categoryName: 'Электрооборудование', price: 28000, image: 'https://images.unsplash.com/photo-1673337188103-c196140adebd?w=805', brand: 'Bosch', rating: 4.7, reviews: 124, inStock: true, oilType: null, volume: null, filterType: null, compatibility: ['Hyundai Elantra 2018-2024'], sku: 'BOS-S4-60AH', description: 'Надежный аккумулятор для легковых авто.', specifications: [{ label: 'Емкость', value: '60Ah' }], compatibilityTable: [{ brand: 'Hyundai', model: 'Elantra', years: '2018-2024', engine: '1.6' }], suitableVehicles: ['Hyundai Elantra (2018-2024)'] },
];

const reviews = [
  { id: 1, author: 'Александр М.', rating: 5, date: '15 января 2024', text: 'Отличное масло, двигатель работает тихо и плавно.', vehicle: 'BMW 320i 2018' },
  { id: 2, author: 'Дмитрий К.', rating: 5, date: '10 января 2024', text: 'Использую уже 3 года, никаких нареканий.', vehicle: 'Audi A4 2016' },
  { id: 3, author: 'Сергей П.', rating: 4, date: '5 января 2024', text: 'Хорошее масло.', vehicle: 'Mercedes C200 2019' },
];

const account = {
  orders: [{ id: 'ORD-1045', status: 'delivered', statusText: 'Доставлен', date: '14.01.2026', total: 33200, items: [{ id: '1', name: 'Mobil 1 ESP 5W-30', price: 12500, quantity: 2, image: 'https://images.unsplash.com/photo-1738918903155-0601cdc65818?w=200' }] }],
  favorites: ['1', '2', '4'],
  addresses: [{ id: 'ADR-1', name: 'Дом', address: 'г. Алматы, пр. Абая, 25', phone: '+7 (777) 123-45-67', isDefault: true }],
};

module.exports = { categories, banners, brands, vehicles, years, products, reviews, account };
