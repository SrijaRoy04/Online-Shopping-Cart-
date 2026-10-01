import { Search } from "lucide-react";
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const categories = ["All items", ...new Set(products.map((product) => product.category))];

export default function ProductList() {
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const searchTerm = query.trim().toLocaleLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === "All items" || product.category === category;
    const searchableText = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase();
    return matchesCategory && searchableText.includes(searchTerm);
  });

  return (
    <section className="catalog" id="catalog" aria-labelledby="shop-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> THE NORTHSTAR EDIT</p>
          <h2 id="shop-title">Find your next <em>favourite.</em></h2>
        </div>
        <p className="product-count">{visibleProducts.length} considered {visibleProducts.length === 1 ? "essential" : "essentials"}</p>
      </div>
      <div className="catalog-tools">
        <div className="category-list" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              className={`category-chip${category === name ? " selected" : ""}`}
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={13} aria-hidden="true" />
          <span className="sr-only">Search products</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" />
          <kbd>/</kbd>
        </label>
      </div>
      <div className="product-grid" aria-live="polite">
        {visibleProducts.length ? visibleProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        )) : (
          <div className="catalog-empty"><Search size={22} /><p>No finds this time. Try another search or category.</p></div>
        )}
      </div>
    </section>
  );
}