import React from 'react';
import { speakersData } from '../data/speakers';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const SpeakersSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const idx = Number(id);
  const product =
    speakersData.find((p) => String(p.id ?? '') === String(id)) ??
    (Number.isFinite(idx) ? speakersData[idx - 1] : undefined);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: 16 }}><h2>Speaker not found</h2></div>
      </>
    );
  }

  const image = product.image;

  return (
    <>
      <Navbar />
      <div className="ind-section">
        <div className="ind-image">
          {image ? (
            <img src={image.startsWith('/') ? image : `/${image}`} alt={`${product.brand} ${product.model}`} />
          ) : (
            <div style={{ width: '100%', height: 420, background: '#eee', borderRadius: 12 }} />
          )}
        </div>

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

export default SpeakersSingle;


