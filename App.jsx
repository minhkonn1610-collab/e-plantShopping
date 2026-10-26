import React, { useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./CartSlice";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

function AppContent() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  const handlePlantsClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowProductList(false);
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  if (showCart) {
    return (
      <CartItem
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  if (showProductList) {
    return (
      <ProductList
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
      />
    );
  }

  return (
    <main className="landing-page background-image">
      <div className="hero-content">
        <h1>Welcome to Paradise Nursery</h1>

        <p>
          Bring nature into your home with our beautiful collection
          of houseplants. Discover the perfect plants to make your
          living space greener, healthier, and more relaxing.
        </p>

        <button
          type="button"
          className="get-started-button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
