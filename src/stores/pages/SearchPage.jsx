import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";

// Auto-load every dataset in src/stores/data/*.js
const modules = import.meta.glob("../data/*.js", { eager: true });

const useQuery = () => new URLSearchParams(useLocation().search);

const routeForType = (type) => {
  const map = {
    mobiles: "mobiles",
    computers: "computers",
    watch: "watch",
    watches: "watch",
    men: "men",
    woman: "woman",
    women: "woman",
    furniture: "furniture",
    kitchen: "kitchen",
    fridge: "fridge",
    books: "books",
    speakers: "speakers",
    tv: "tv",
    tvs: "tv",
    ac: "ac",
  };
  return map[type] || type;
};

const normalize = (item, idx) => ({
  brand:
    item.brand ||
    item.company ||
    item.manufacturer ||
    item.maker ||
    item.author ||
    item.publisher ||
    "",
  model:
    item.model ||
    item.title ||
    item.name ||
    item.product ||
    item.category ||
    "",
  image: item.image,
  id: item.id ?? idx + 1,
  price: item.price ?? item.mrp ?? item.cost ?? "",
});

const buildIndex = () => {
  const index = [];
  Object.entries(modules).forEach(([path, mod]) => {
    const m = path.match(/\/data\/(.+?)\.js$/);
    if (!m) return;
    const type = m[1];
    Object.values(mod).forEach((exp) => {
      if (Array.isArray(exp)) {
        exp.forEach((item, i) => {
          const n = normalize(item, i);
          index.push({ ...n, type, _raw: item });
        });
      }
    });
  });
  return index;
};

const ALL_ITEMS = buildIndex();

const SearchPage = () => {
  const qRaw = useQuery().get("q") || "";
  const q = qRaw.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return ALL_ITEMS.filter((x) => {
      const brand = (x.brand || "").toLowerCase();
      const model = (x.model || "").toLowerCase();
      const type = (x.type || "").toLowerCase();
      const price = (x.price + "").toLowerCase();
      return (
        brand.includes(q) || model.includes(q) || type.includes(q) || price.includes(q)
      );
    });
  }, [q]);

  const linkFor = (item) => `/${routeForType(item.type)}/${item.id}`;

  const highlight = (text) => {
    if (!q) return text;
    const parts = String(text).split(new RegExp(`(${q})`, "ig"));
    return parts.map((p, i) =>
      p.toLowerCase() === q ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="search-wrapper">
        <aside className="search-aside">
          <h2 className="search-title">Search</h2>
          <div className="search-query">
            results for <span className="query">“{qRaw}”</span>
          </div>
          <div className="search-count">{results.length} result{results.length === 1 ? "" : "s"}</div>
        </aside>

        <main className="search-main">
          {q === "" ? (
            <div className="empty-box">
              Type something in the search box and press <b>Enter</b>.
            </div>
          ) : results.length === 0 ? (
            <div className="empty-box">
              No results for <b>“{qRaw}”</b>. Try a brand (e.g., <i>LG</i>), model (e.g., <i>Bravia</i>), or category (e.g., <i>computers</i>).
            </div>
          ) : (
            <div className="search-grid">
              {results.map((item, i) => (
                <Link to={linkFor(item)} className="search-card" key={`${item.type}-${item.id}-${i}`}>
                  <div className="card-imgWrap">
                    {item.image ? (
                      <img
                        src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                        alt={`${item.brand} ${item.model}`}
                        className="card-img"
                      />
                    ) : (
                      <div className="card-imgPlaceholder" />
                    )}
                  </div>

                  <div className="card-body">
                    <div className="card-title">
                      <span className="brand">{highlight(item.brand)}</span>
                      {item.brand && item.model ? ", " : ""}
                      <span className="model">{highlight(item.model)}</span>
                    </div>

                    <div className="card-meta">
                      <span className="badge">{routeForType(item.type)}</span>
                      {item.price && (
                        <span className="price">₹{String(item.price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SearchPage;





