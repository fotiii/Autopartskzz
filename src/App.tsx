import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev =>
        prev.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  addToCart={addToCart} 
                  selectedVehicle={selectedVehicle}
                  setSelectedVehicle={setSelectedVehicle}
                />
              } 
            />
            <Route 
              path="/catalog" 
              element={
                <CatalogPage 
                  addToCart={addToCart} 
                  selectedVehicle={selectedVehicle}
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetailPage addToCart={addToCart} />} 
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateCartQuantity}
                  removeItem={removeFromCart}
                />
              }
            />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
