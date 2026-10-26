import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Air-Purifying Plants",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=500&q=80",
    description: "A stylish, low-maintenance houseplant."
  },
  {
    id: 2,
    name: "Spider Plant",
    category: "Air-Purifying Plants",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=500&q=80",
    description: "A graceful plant with arching green leaves."
  },
  {
    id: 3,
    name: "Peace Lily",
    category: "Air-Purifying Plants",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
    description: "A beautiful plant with elegant foliage."
  },
  {
    id: 4,
    name: "Areca Palm",
    category: "Air-Purifying Plants",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=500&q=80",
    description: "A tropical plant for indoor spaces."
  },
  {
    id: 5,
    name: "Rubber Plant",
    category: "Air-Purifying Plants",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af7e4?auto=format&fit=crop&w=500&q=80",
    description: "A plant with broad, glossy leaves."
  },
  {
    id: 6,
    name: "Boston Fern",
    category: "Air-Purifying Plants",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=500&q=80",
    description: "A lush fern with feathery foliage."
  },
  {
    id: 7,
    name: "ZZ Plant",
    category: "Easy-Care Plants",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
    description: "A resilient plant that tolerates low light."
  },
  {
    id: 8,
    name: "Golden Pothos",
    category: "Easy-Care Plants",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80",
    description: "A trailing plant with green leaves."
  },
  {
    id: 9,
    name: "Chinese Evergreen",
    category: "Easy-Care Plants",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80",
    description: "A decorative plant with patterned foliage."
  },
  {
    id: 10,
    name: "Dracaena",
    category: "Easy-Care Plants",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af7e4?auto=format&fit=crop&w=500&q=80",
    description: "An attractive upright indoor plant."
  },
  {
    id: 11,
    name: "Jade Plant",
    category: "Easy-Care Plants",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=500&q=80",
    description: "A popular succulent with thick leaves."
  },
  {
    id: 12,
    name: "Cast Iron Plant",
    category: "Easy-Care Plants",
    price: 23.99,
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=500&q=80",
    description: "A hardy plant for a variety of interiors."
  },
  {
    id: 13,
    name: "Aloe Vera",
    category: "Succulents and Cacti",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
    description: "A succulent with thick, pointed leaves."
  },
  {
    id: 14,
    name: "Echeveria",
    category: "Succulents and Cacti",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80",
    description: "A compact, rosette-shaped succulent."
  },
  {
    id: 15,
    name: "Haworthia",
    category: "Succulents and Cacti",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80",
    description: "A small succulent for desks and shelves."
  },
  {
    id: 16,
    name: "Zebra Haworthia",
    category: "Succulents and Cacti",
    price: 12.49,
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=500&q=80",
    description: "A succulent with distinctive striped leaves."
  },
  {
    id: 17,
    name: "Christmas Cactus",
    category: "Succulents and Cacti",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=500&q=80",
    description: "A cactus with segmented green stems."
  },
  {
    id: 18,
    name: "Barrel Cactus",
    category: "Succulents and Cacti",
    price: 14.49,
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=500&q=80",
    description: "A compact cactus for a sunny location."
  }
];

const categories = [
  "Air-Purifying Plants",
  "Easy-Care Plants",
  "Succulents and Cacti"
];

export function Navbar({
  cartItemCount,
  onHomeClick,
  onPlantsClick,
  onCartClick
}) {
  return (
    <nav className="navbar">
      <a href="#home" onClick={(event) => {
        event.preventDefault();
        onHomeClick();
      }}>
        Home
      </a>

      <a href="#plants" onClick={(event) => {
        event.preventDefault();
        onPlantsClick();
      }}>
        Plants
      </a>

      <a href="#cart" onClick={(event) => {
        event.preventDefault();
        onCartClick();
      }}>
        🛒 Cart ({cartItemCount})
      </a>
    </nav>
  );
}

function ProductList({
  onHomeClick = () => {},
  onPlantsClick = () => {},
  onCartClick = () => {}
}) {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const cartItems = useSelector(
    (state) => state.cart?.cartItems ?? []
  );

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleHomeClick = () => {
    onHomeClick();
  };

  const handlePlantsClick = () => {
    onPlantsClick();
  };

  const handleCartClick = () => {
    onCartClick();
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true
    }));
  };

  return (
    <div className="product-list-page">
      <Navbar
        cartItemCount={cartItemCount}
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
      />

      <main id="plants">
        <header className="products-header">
          <h1>Paradise Nursery Plants</h1>
          <p>
            Find the perfect plants to bring nature into your home.
          </p>
        </header>

        {categories.map((category) => (
          <section className="plant-category" key={category}>
            <h2>{category}</h2>

            <div className="plant-grid">
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <article className="plant-card" key={plant.id}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-thumbnail"
                      loading="lazy"
                    />

                    <div className="plant-card-content">
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>

                      <p className="plant-price">
                        ${plant.price.toFixed(2)}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name]
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
