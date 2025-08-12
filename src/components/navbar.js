"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import SearchResults from "@/components/SearchResults";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <nav className="flex w-full fixed right-0 top-0 z-1000 bg-gray-100 shadow-[inset_3px_-11px_13px_-16px_rgba(0,0,0,0.65)] h-[60px] md:h-[70px]">
      <div className="flex items-center h-full w-[30%] md:w-[25%] pr-2 md:pr-4">
        <Link href="/" className="w-auto h-[100%] md:h-[60%]">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={200}
            height={100}
            className="w-auto h-[100%] object-contain cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center justify-end h-full w-[70%] md:w-[75%] pl-2 md:pl-4 relative">
        <span className="flex w-[80%] relative items-center justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchOpen(true)}
            className="h-[30px] md:h-[40px] w-full max-w-[130px] md:max-w-[250px] text-[#5d5d5d] border border-gray-600 rounded-lg bg-gray-100 text-sm md:text-base focus:ring-blue-500 focus:border-blue-500 px-8"
            placeholder="جستجوی محصولات..."
          />
          <SearchIcon
            sx={{
              fontSize: { xs: "24px", md: "30px" },
              color: "#5d5d5d",
              position: "absolute",
              left: "8px",
              cursor: "pointer",
            }}
          />
          {isSearchOpen && (
            <SearchResults query={searchQuery} onClose={closeSearch} />
          )}
        </span>
        <Link
          href="/cart"
          className="flex w-[20%] items-center justify-end pl-2"
        >
          <ShoppingCartIcon
            sx={{
              fontSize: { xs: "24px", md: "30px" },
              color: "#5d5d5d",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
    </nav>
  );
}
