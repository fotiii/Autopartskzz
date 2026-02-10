const express = require('express');
const cors = require('cors');
const { categories, banners, brands, vehicles, years, products, reviews, account } = require('./data');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/home', (_, res) => {
  res.json({ banners, categories, featuredProducts: products.slice(0, 8) });
});

app.get('/api/vehicles/brands', (_, res) => res.json({ brands: Object.keys(vehicles) }));
app.get('/api/vehicles/models', (req, res) => res.json({ models: vehicles[req.query.brand] || [] }));
app.get('/api/vehicles/years', (_, res) => res.json({ years }));

app.post('/api/vin/decode', (req, res) => {
  const vin = String(req.body?.vin || '').trim().toUpperCase();
  if (vin.length !== 17) {
    return res.status(400).json({ message: 'VIN-код должен содержать 17 символов' });
  }

  const decodedVehicle = { brand: 'Toyota', model: 'Camry', year: '2020' };

  res.json({
    vin,
    vehicle: decodedVehicle,
    suggestions: products
      .filter((p) => p.compatibility.some((c) => c.includes(decodedVehicle.brand)))
      .slice(0, 6),
  });
});

app.get('/api/search/suggestions', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  if (!q) return res.json({ suggestions: [] });

  const suggestions = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q),
    )
    .slice(0, 6)
    .map((p) => ({ id: p.id, label: `${p.name} • ${p.brand}`, query: p.name }));

  res.json({ suggestions });
});

app.get('/api/catalog/meta', (_, res) => {
  res.json({
    brands,
    oilTypes: ['synthetic', 'semi-synthetic', 'mineral'],
    volumes: ['1L', '4L', '5L'],
    filterTypes: ['oil', 'air', 'fuel', 'cabin'],
    availability: ['in_stock', 'out_of_stock'],
  });
});

app.get('/api/products', (req, res) => {
  const {
    category,
    search,
    vin,
    sort = 'popular',
    brands: brandsParam,
    priceMin = '0',
    priceMax = '1000000',
    inStock,
    rating,
    oilType,
    volume,
    filterType,
    brand,
    model,
  } = req.query;

  let result = [...products];

  if (category) result = result.filter((p) => p.category === category);

  if (search) {
    const term = String(search).toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term),
    );
  }

  if (vin) result = result.filter((p) => p.inStock);

  if (brandsParam) {
    const selectedBrands = String(brandsParam).split(',');
    result = result.filter((p) => selectedBrands.includes(p.brand));
  }

  if (brand && model) {
    result = result.filter((p) =>
      p.compatibility.some(
        (line) => line.includes(String(brand)) && line.includes(String(model)),
      ),
    );
  }

  result = result.filter(
    (p) => p.price >= Number(priceMin) && p.price <= Number(priceMax),
  );

  if (inStock === 'true') result = result.filter((p) => p.inStock);
  if (rating) result = result.filter((p) => p.rating >= Number(rating));
  if (oilType) result = result.filter((p) => p.oilType === oilType);
  if (volume) result = result.filter((p) => p.volume === volume);
  if (filterType) result = result.filter((p) => p.filterType === filterType);

  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

  res.json({ total: result.length, products: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Товар не найден' });

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  res.json({
    ...product,
    images: [product.image, `${product.image}&2`, `${product.image}&3`],
    reviews,
    relatedProducts,
  });
});

app.post('/api/cart/recommendations', (req, res) => {
  const cartItems = req.body?.items || [];
  const hasOil = cartItems.some(
    (i) => String(i.category).includes('Моторное масло') || i.category === 'oils',
  );

  const recommendations = hasOil
    ? products.filter((p) => p.category === 'filters').slice(0, 4)
    : products.slice(0, 4);

  res.json({
    recommendations,
    message: hasOil
      ? 'Для выбранного масла рекомендуем подходящие фильтры.'
      : 'Популярные дополнения к заказу.',
  });
});

app.get('/api/account', (_, res) => {
  const favoriteProducts = products.filter((p) => account.favorites.includes(p.id));
  res.json({ orders: account.orders, addresses: account.addresses, favoriteProducts });
});

app.post('/api/orders/reorder', (req, res) => {
  const orderId = req.body?.orderId;
  if (!orderId) return res.status(400).json({ message: 'orderId required' });

  res.json({ ok: true, message: `Заказ ${orderId} добавлен в корзину` });
});

module.exports = app;
