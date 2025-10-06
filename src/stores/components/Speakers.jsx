import React from 'react';
import { speakersData } from '../data/speakers';
import { Link } from 'react-router-dom';

const Speakers = () => {
  const firstFive = speakersData.slice(0, 5);

  return (
    <>
      <div className="proTitle">
        <h2>Speakers</h2>
      </div>

      <div className="proSection">
        {firstFive.map((item, idx) => (
          <div className="imgBox" key={`${item.brand}-${item.model}-${idx}`}>
            <Link to="/speakers">
              {item.image ? (
                <img
                  className="proImage"
                  src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                  alt={`${item.brand} ${item.model}`}
                />
              ) : (
                <div style={{ width: '100%', height: 140, background: '#eee', borderRadius: 12 }} />
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Speakers;

