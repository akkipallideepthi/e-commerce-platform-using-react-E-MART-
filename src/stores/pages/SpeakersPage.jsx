import React, { useState } from 'react';
import { speakersData } from '../data/speakers';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const SpeakersPage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);

  const companyHandler = (brand) => {
    if (selectedProduct.includes(brand)) {
      setSelectedProduct(selectedProduct.filter((b) => b !== brand));
    } else {
      setSelectedProduct([...selectedProduct, brand]);
    }
  };

  const filteredProduct =
    selectedProduct.length === 0
      ? speakersData
      : speakersData.filter((s) => selectedProduct.includes(s.brand));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        <div className="pro-selected">
          {speakersData.map((s, idx) => (
            <div className="pro-input" key={`${s.brand}-${idx}`}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedProduct.includes(s.brand)}
                  onChange={() => companyHandler(s.brand)}
                />
                {s.brand}
              </label>
            </div>
          ))}
        </div>

        <div className="pageSection">
          {filteredProduct.map((item, idx) => {
            const id = String(item.id ?? idx + 1);
            const image = item.image;

            return (
              <div key={id}>
                <Link to={`/speakers/${id}`}>
                  <div className="pageImg">
                    {image ? (
                      <img
                        src={image.startsWith('/') ? image : `/${image}`}
                        alt={`${item.brand} ${item.model}`}
                      />
                    ) : (
                      <div style={{ width: '100%', height: 220, background: '#eee', borderRadius: 8 }} />
                    )}
                  </div>
                </Link>

                <div
                  className="proModel"
                  style={{ color: '#000', fontWeight: 600, fontSize: '14px', textAlign: 'center', marginTop: 8 }}
                >
                  {item.brand}, {item.model}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SpeakersPage;



