import React from 'react';
import { tvData } from '../data/tv';          // make sure this path is correct
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const TVSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  if (!id) return <Navigate to="/tv" replace />;

  const idx = Number(id);
  const product =
    tvData.find((p) => String(p.id ?? '') === String(id)) ??
    (Number.isFinite(idx) ? tvData[idx - 1] : undefined);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: 16 }}>
          <h2>TV not found</h2>
        </div>
      </>
    );
  }

  const image = product.image;

  return (
    <>
      <Navbar />
      <div className="ind-section">
        {/* Image */}
        <div className="ind-image">
          {image ? (
            <img
              src={image.startsWith('/') ? image : `/${image}`}
              alt={`${product.brand} ${product.model}`}
            />
          ) : (
            <div style={{ width: '100%', height: 420, background: '#eee', borderRadius: 12 }} />
          )}
        </div>

        {/* Details */}
        <div className="ind-details space">
          <div className="ind-company"><h2>{product.brand}</h2></div>
          <div className="ind-model space"><h3>{product.model}</h3></div>
          <div className="ind-price space"><h2>{product.price}</h2></div>
          <div className="ind-desc space"><p>{product.description}</p></div>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default TVSingle;



