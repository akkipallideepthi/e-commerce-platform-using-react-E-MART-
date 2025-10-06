import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
// If you put the CSS in a new file, import it once:
// import "./Cart.css";

const UserCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart /*, addToCart */ } = useCart();

  // --- checkout form state ---
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod", // only COD enabled
  });

  // ✅ sanitize phone & pincode
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => ({ ...f, phone: digits }));
      return;
    }
    if (name === "pincode") {
      const digits = value.replace(/\D/g, "").slice(0, 6);
      setForm((f) => ({ ...f, pincode: digits }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  // --- totals ---
  const subTotal = useMemo(
    () =>
      (cartItems || []).reduce(
        (sum, it) => sum + Number(it.price || 0) * Number(it.qty || 1),
        0
      ),
    [cartItems]
  );
  const shipping = subTotal > 0 ? 49 : 0;
  const grandTotal = subTotal + shipping;

  // --- place order ---
  const placeOrder = (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // basic validation
    const { name, phone, address, city, pincode } = form;
    if (![name, phone, address, city, pincode].every((v) => String(v).trim())) {
      alert("Please fill all details before placing order.");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    // pretend to create an order #
    const orderId = "EM-" + Math.floor(100000 + Math.random() * 900000);

    // clear cart
    if (typeof clearCart === "function") {
      clearCart();
    } else if (typeof removeFromCart === "function") {
      (cartItems || []).forEach((it) => removeFromCart(it));
    }

    alert(
      `Order placed successfully!\nOrder ID: ${orderId}\nPayment: Cash on Delivery`
    );
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="cart-page">
        {/* LEFT: items list */}
        <section className="cart-left">
          <h2 className="y-cart">Your Cart</h2>

          {(cartItems || []).length === 0 ? (
            <div className="empty">Your cart is empty.</div>
          ) : (
            (cartItems || []).map((item) => (
              <div className="cart-itemCard" key={`${item.id}-${item.name}`}>
                <div className="cart-itemLeft">
                  <div className="cart-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-info">
                    <div className="cart-name">{item.category || "Item"}</div>
                    <div className="cart-model">{item.name}</div>
                    <div className="cart-price">
                      ₹{Number(item.price || 0).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="cart-actions">
                  <button
                    className="removeBtn"
                    onClick={() =>
                      typeof removeFromCart === "function"
                        ? removeFromCart(item)
                        : null
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* RIGHT: checkout details */}
        <aside className="checkout">
          <h3 className="checkout-title">Add details & Place order</h3>

          <form onSubmit={placeOrder} className="checkout-form">
            <div className="checkout-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>

            <div className="checkout-row">
              <div className="checkout-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={onChange}
                  placeholder="10-digit mobile number"
                  required
                  autoComplete="tel"
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pincode}
                  onChange={onChange}
                  placeholder="PIN"
                  required
                  autoComplete="postal-code"
                />
              </div>
            </div>

            <div className="checkout-row">
              <div className="checkout-field">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={onChange}
                  placeholder="City"
                  required
                  autoComplete="address-level2"
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  onChange={onChange}
                  autoComplete="address-level1"
                />
              </div>
            </div>

            <div className="checkout-field">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={form.address}
                onChange={onChange}
                placeholder="House no, street, area"
                required
                autoComplete="street-address"
              />
            </div>

            <fieldset className="checkout-pay">
              <legend>Payment method</legend>
              <label className="pay-option">
                <input type="radio" name="payment" value="cod" checked readOnly />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label className="pay-option disabled">
                <input type="radio" name="payment" value="card" disabled />
                <span>Card — coming soon</span>
              </label>
            </fieldset>

            <div className="checkout-summary">
              <h4>Order Summary</h4>
              <div className="sum-line">
                <span>Subtotal</span>
                <strong>₹{subTotal.toFixed(2)}</strong>
              </div>
              <div className="sum-line">
                <span>Shipping</span>
                <strong>₹{shipping.toFixed(2)}</strong>
              </div>
              <div className="sum-total">
                <span>Total</span>
                <strong>₹{grandTotal.toFixed(2)}</strong>
              </div>
              <p className="sum-note">Prices include all taxes.</p>
            </div>

            <button
              type="submit"
              className="checkout-btn"
              disabled={(cartItems || []).length === 0}
              title={
                (cartItems || []).length === 0
                  ? "Add items to place order"
                  : "Place order"
              }
            >
              Place Order
            </button>
          </form>
        </aside>
      </div>
    </>
  );
};

export default UserCart;

                 




