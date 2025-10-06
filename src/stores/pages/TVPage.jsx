import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { tvData } from '../data/tv'; // adjust if your path is different

const TVPage = () => {
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
      ? tvData
      : tvData.filter((t) => selectedProduct.includes(t.brand));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* LEFT: filters (like Fridge) */}
        <div className="pro-selected">
          {tvData.map((t, idx) => (
            <div className="pro-input" key={`${t.brand}-${idx}`}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedProduct.includes(t.brand)}
                  onChange={() => companyHandler(t.brand)}
                />
                {t.brand}
              </label>
            </div>
          ))}
        </div>

        {/* RIGHT: grid */}
        <div className="pageSection">
          {filteredProduct.map((item, idx) => {
            const id = String(item.id ?? idx + 1);
            const image = item.image;

            return (
              <div key={id}>
                <Link to={`/tv/${id}`}>
                  <div className="pageImg">
                    {typeof image === 'string' && image ? (
                      <img
                        src={image.startsWith('/') ? image : `/${image}`}
                        alt={`${item.brand} ${item.model}`}
                      />
                    ) : (
                      <div style={{ width: '100%', height: 220, background: '#eee', borderRadius: 8 }} />
                    )}
                  </div>
                </Link>

                {/* title only (black, small, centered). no price, no button */}
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

export default TVPage;



