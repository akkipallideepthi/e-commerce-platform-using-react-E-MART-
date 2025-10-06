import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { booksData } from "../data/books.js";
import { useCart } from "../context/CartContext";

const getBrand = (b) => b.company || b.brand || b.author || b.publisher || b.category || "Others";
const getModel = (b) => b.title || b.name || b.model || b.product || "Untitled";
const getPrice = (b) => b.price || b.mrp || b.cost || null;
const getDesc  = (b) => b.description || b.desc || "";

const BooksSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // if no id, go to list
  if (!id) return <Navigate to="/books" replace />;

  const nId = Number(id);
  const raw =
    booksData.find((x) => String(x.id ?? "") === String(id)) ??
    (Number.isFinite(nId) ? booksData[nId - 1] : undefined);

  if (!raw) return <h2 style={{ padding: 16 }}>Book not found</h2>;

  const img = raw.image?.startsWith("/") ? raw.image : `/${raw.image}`;

  const handleAdd = () => {
    addToCart({
      id: `book-${raw.id ?? id}`,
      name: getModel(raw),
      image: img,
      price: Number(getPrice(raw) || 0),
      qty: 1,
      category: "Books",
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 16, display: "grid", gap: 16, gridTemplateColumns: "1fr 1.2fr" }}>
        {/* Image panel */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #eee",
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={img}
            alt={getModel(raw)}
            style={{ width: "100%", maxHeight: 520, objectFit: "contain" }}
          />
        </div>

        {/* Info panel */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #eee", padding: 16 }}>
          <h1 style={{ marginTop: 0 }}>{getModel(raw)}</h1>
          <div style={{ color: "#6b7280", marginBottom: 8 }}>{getBrand(raw)}</div>

          {getPrice(raw) && (
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              ₹{getPrice(raw)}
            </div>
          )}

          <p style={{ color: "#374151", lineHeight: 1.6 }}>
            {getDesc(raw) || "No description available."}
          </p>

          {/* Add to Cart (like mobiles page) */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={handleAdd}
              className="addBtn"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid #111",
                background: "#ff6a00",
                color: "#111",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksSingle;




