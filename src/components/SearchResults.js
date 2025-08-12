"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SearchResults({ query, onClose }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      fetch(
        "https://raw.githubusercontent.com/TahmineRajaee/florist/main/data.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const allProducts = data.categories.flatMap((category) =>
            category.products.map((product) => ({
              ...product,
              categoryId: category.id,
              categoryTitle: category.title,
            }))
          );
          const filtered = allProducts.filter((product) =>
            product.title.includes(query)
          );
          setResults(filtered);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  if (query.length === 0) return null;

  return (
    <section className="absolute top-full left-0 w-full max-w-[250px] bg-white shadow-lg rounded-b-lg z-50 max-h-[300px] overflow-y-auto">
      {loading ? (
        <p className="flex justify-center p-4">در حال جستجو...</p>
      ) : results.length > 0 ? (
        results.map((product) => (
          <Link
            key={`${product.categoryId}-${product.id}`}
            href={`/categories/${product.categoryId}/products/${product.id}`}
            onClick={onClose}
            className="block p-3 hover:bg-gray-100 border-b"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mr-1">
                <h6 className="text-sm font-medium">{product.title}</h6>
                <p className="text-xs text-gray-500">{product.categoryTitle}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="flex justify-center p-4">نتیجه‌ای یافت نشد</p>
      )}
    </section>
  );
}
