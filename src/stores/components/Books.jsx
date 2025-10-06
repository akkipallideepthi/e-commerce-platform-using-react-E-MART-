import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { booksData } from "../data/books.js";
import { useCart } from "../context/CartContext";  // ✅ cart hook

const getBrand = (b) => b.company || b.brand || b.author || b.publisher || b.category || "Others";
const getTitle = (b) => b.title || b.name || b.model || b.product || "Untitled";

const BookDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();   // ✅ access addToCart

  const book = booksData.find((b) => String(b.id) === id) || booksData[Number(id) - 1];

  if (!book) return <p>Book not found</p>;

  const brand = getBrand(book);
  const title = getTitle(book);
  const price = Number(book.price || 0);
  const img = book.image?.startsWith("/") ? book.image : `/${book.image}`;

  const handleAddToCart = () => {
    addToCart({
      id: `book-${book.id ?? id}`,
      name: `${brand}, ${title}`,
      price,
      image: img,
      qty: 1,
      category: "Books"
    });
  };

  return (
    <>
      <Navbar />
      <div className="ind-section">
        <div className="ind-image">
          <img src={img} alt={title} />
        </div>
        <div className="ind-details">
          <h2>{brand}</h2>
          <h3 className="space">{title}</h3>
          <h2 className="space">₹{price.toFixed(2)}</h2>
          {book.description && <p className="space">{book.description}</p>}

          {/* ✅ Now Add to Cart button */}
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default BookDetails;



