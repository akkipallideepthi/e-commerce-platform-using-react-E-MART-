import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ uses our auth

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const goSearch = () => {
    const q = search.trim();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="navbar-section">
      <div className="navSection">
        <Link to="/" className="custom-link">
          <div className="title">
            <h2>E-Mart</h2>
          </div>
        </Link>

        {/* SEARCH */}
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goSearch()}
          />
        </div>

        {/* USER / AUTH */}
        <div className="user">
          {user ? (
            <div className="user-detail auth">
              {/* removed "Hi," – show only the name */}
              <span className="name">{user.name}</span>
              <span className="sep">|</span>
              <span
                role="button"
                tabIndex={0}
                className="signout"
                onClick={signOut}
                onKeyDown={(e) => e.key === "Enter" && signOut()}
              >
                Sign Out
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="user-detail"
              onClick={() => navigate("/signin")}
              style={{ background: "transparent", border: "none", color: "white", fontWeight: 600, cursor: "pointer" }}
              aria-label="Sign In or Sign Up"
            >
              SignIN/SignUp
            </button>
          )}
        </div>

        {/* CART */}
        <Link to="/cart">
          <div className="cart">
            Cart <span>{cartItems.length}</span>
          </div>
        </Link>
      </div>

      <div className="subMenu">
        <ul>
          <Link to="/mobiles" className="custom-link"><li>Mobiles</li></Link>
          <Link to="/computers" className="custom-link"><li>Computers</li></Link>
          <Link to="/watch" className="custom-link"><li>Watches</li></Link>
          <Link to="/men" className="custom-link"><li>Mens Wear</li></Link>
          <Link to="/woman" className="custom-link"><li>Woman Wear</li></Link>
          <Link to="/furniture" className="custom-link"><li>Furniture</li></Link>
          <Link to="/kitchen" className="custom-link"><li>Kitchen</li></Link>
          <Link to="/fridge" className="custom-link"><li>Fridge</li></Link>
          <Link to="/books" className="custom-link"><li>Books</li></Link>
          <Link to="/speakers" className="custom-link"><li>Speakers</li></Link>
          <Link to="/tv" className="custom-link"><li>TV's</li></Link>
          <Link to="/ac" className="custom-link"><li>AC</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

