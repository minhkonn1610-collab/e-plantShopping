import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { Navbar } from "./ProductList";

function CartItem({
  onHomeClick = () => {
    window.location.href = "/";
  },
  onPlantsClick = () => {
    window.location.href = "/#plants";
  },
  onCartClick = () => {},
  onContinueShopping,
}) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.cartItems ?? []
  );

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    window.alert("Coming Soon!");
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();

    if (onContinueShopping) {
      onContinueShopping();
    } else {
      onPlantsClick();
    }
  };

  return (
    <div className="cart-page">
      <Navbar
        cartItemCount={cartItemCount}
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={onCartClick}
      />

      <main className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <h2>Your cart is empty</h2>

            <p>
              Discover our beautiful collection of houseplants.
            </p>

            <a
              href="#plants"
              className="get-started-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </a>
          </section>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.name}>
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
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>

                      <span>
                        Quantity: {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <section className="cart-summary">
              <h2>Total Items: {cartItemCount}</h2>

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

              <a
                href="#plants"
                className="get-started-button"
                onClick={handleContinueShopping}
              >
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
