import React, { useState, useMemo, useRef } from "react";
import { cryptoBooks } from "../data/cryptoBooks";
import "./Books.css";

export default function Books() {
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");
  const sliderRef = useRef(null);

  const categories = useMemo(() => {
    const s = new Set(["All"]);
    cryptoBooks.forEach(b => s.add(b.category));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return cryptoBooks.filter(b => {
      const catOk = category === "All" || b.category === category;
      const queryOk =
        !query ||
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.summary.toLowerCase().includes(query);
      return catOk && queryOk;
    });
  }, [category, q]);

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const offset = dir === "right" ? el.clientWidth * 0.6 : -el.clientWidth * 0.6;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="books-wrapper">
      <h1 className="title ">Crypto & Blockchain Books</h1>
      <div className="controls-row">
        <input
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="search-input"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="slider-controls">
        <button className="arrow" onClick={() => scroll("left")}>‹</button>
        <div className="book-slider" ref={sliderRef}>
          {filtered.map(b => <BookCard key={b.id} book={b} />)}
        </div>
        <button className="arrow" onClick={() => scroll("right")}>›</button>
      </div>
      <h2 className="section-subtitle">All results</h2>
      <div className="grid-fallback">
        {filtered.map(b => <BookCard key={`g-${b.id}`} book={b} />)}
      </div>
    </div>
  );
}

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <p className="book-category">{book.category} • {book.level}</p>
      <p className="book-summary">{book.summary}</p>
      <div className="book-actions">
        <a className="buy-btn" href={book.buyLinkIN} target="_blank" rel="noreferrer">Buy (IN)</a>
        <a className="buy-btn" href={book.buyLinkUS} target="_blank" rel="noreferrer">Buy (US)</a>
      </div>
    </div>
  );
}
