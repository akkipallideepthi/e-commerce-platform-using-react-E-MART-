import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { booksData } from "../data/books.js";

// helpers
const getBrand = (b) => b.company || b.brand || b.author || b.publisher || b.category || "Others";
const getTitle = (b) => b.title || b.name || b.model || b.product || "Untitled";
const getDesc  = (b) => b.description || b.desc || "";

const BooksPage = () => {
  const [selected, setSelected] = useState([]);

  // left filter options
  const options = useMemo(() => {
    const s = new Set(booksData.map(getBrand));
    return Array.from(s);
  }, []);

  const toggle = (val) =>
    setSelected((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));

  // normalize list
  const list = useMemo(
    () =>
      booksData.map((b, i) => {
        const id = b.id ?? i + 1;
        const image = b.image?.startsWith("/") ? b.image : `/${b.image}`;
        return {
          id,
          image,
          title: getTitle(b),
          brand: getBrand(b),
          description: getDesc(b),
          raw: b,
        };
      }),
    []
  );

  const filtered = selected.length ? list.filter((x) => selected.includes(x.brand)) : list;

  return (
    <>
      <Navbar />
      <div className="fullpage">
        {/* left filters */}
        <div className="pro-selected">
          {options.map((opt) => (
            <div className="pro-input" key={opt}>
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>

        {/* grid */}
        <div className="pageSection">
          {filtered.map((item) => (
            <div key={item.id} className="card">
              <Link to={`/books/${item.id}`}>
                <div className="pageImg">
                  <img src={item.image} alt={item.title} />
                </div>
              </Link>

              <div className="cardBody">
                {/* Title styled like mobiles page: black, bold, centered, smaller */}
                <Link
                  to={`/books/${item.id}`}
                  className="proTitle"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "14px",   // smaller size as requested
                    display: "block",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  {item.brand}, {item.title}
                </Link>

                {/* Price and Add to Cart removed as requested */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BooksPage;





