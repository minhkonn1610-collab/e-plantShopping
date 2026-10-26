import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.cartItems ?? []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    window.alert("Coming Soon!");
  };

  return (
    <div className="cart-page">
      <nav className="shop-navbar">
        <a href="/">Home</a>
        <a href="/#plants">Plants</a>
        <a href="/cart">Cart ({cartCount})</a>
      </nav>

      <main className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Discover our beautiful collection of houseplants.</p>
            <a className="continue-shopping" href="/#plants">
              Continue Shopping
            </a>
          </section>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-thumbnail"
                  />

                  <div className="cart-item-details">
                    <h2>{item.name}</h2>

                    <p>
                      Unit Price: ${item.price.toFixed(2)}
                    </p>

                    <p>
                      Item Total: $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(decreaseQuantity(item.id))
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span>Quantity: {item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(increaseQuantity(item.id))
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <section className="cart-summary">
              <h2>
                Total Items: {cartCount}
              </h2>

              <h2>
                Total Amount: ${totalAmount.toFixed(2)}
              </h2>

              <button
                type="button"
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              <button
                type="button"
                className="clear-cart-button"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              <a className="continue-shopping" href="/#plants">
                Continue Shopping
              </a>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default CartItem;
