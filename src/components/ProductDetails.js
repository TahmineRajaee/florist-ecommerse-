"use client";

import React from "react";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "@mui/material/Button";
import { useStore } from "../store/store";
import { useRouter } from "next/navigation";

export default function ProductDetails({ product, categoryId }) {
  const addToCart = useStore((state) => state.addToCart);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      categoryId: categoryId,
      quantity: 1,
    });
    router.push("/cart");
  };

  const description = [
    "امکان ارسال از روز آینده",
    "تضمین کیفیت و تازگی",
    "امکان پرداخت در محل",
    "امکان تغییر رنگ گل ها",
    "گل ها کاملا طبیعی هستند",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="sticky top-4">
            <h2 className="text-base md:text-lg text-gray-500 mb-4">
              {product.title}
            </h2>

            <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-3"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat("fa-IR")
                .format(product.price)
                .replace(/٬/g, ",")}{" "}
              تومان
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <ul className="space-y-2">
              {description.map((desc, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FiberManualRecordIcon className="ml-2 text-green-500 text-xs" />
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          <Button
            fullWidth
            variant="contained"
            color="success"
            size="large"
            onClick={handleAddToCart}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
}
