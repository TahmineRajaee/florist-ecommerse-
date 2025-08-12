"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image.js";
import { useStore } from "../../store/store.js";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);

  const handleQtyChange = (id, categoryId, value) => {
    const q = Math.max(1, parseInt(value || "1", 10));
    updateQuantity(id, categoryId, q);
  };

  const cartTotal = getTotalPrice();
  const shippingCost = 200000;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">سبد خرید</h2>
      {cart.length === 0 ? (
        <h6 className="flex flex-wrap w-full pb-2 text-gray-600">
          سبد خرید شما خالی است، لطفا یک محصول اضافه کنید.
          <div className="flex w-full pt-2 md:pb-4">
            <Link href="/" className="text-blue-600">
              <ExitToAppIcon sx={{ paddingLeft: "5px" }} />
              بازگشت به فروشگاه
            </Link>
          </div>
        </h6>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.categoryId}-${item.id}`}
                className="flex items-center border border-gray-200 rounded-lg p-1 md:p-4"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 mr-1 md:mr-4">
                  <h6 className="font-semibold">{item.title}</h6>
                  <div className="text-sm text-gray-600">
                    {new Intl.NumberFormat("fa-IR")
                      .format(item.price)
                      .replace(/٬/g, ",")}{" "}
                    تومان
                  </div>
                </div>
                <div className="flex items-center px-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQtyChange(item.id, item.categoryId, e.target.value)
                    }
                    className="w-20 border border-gray-300 rounded px-1 py-1 text-center"
                  />

                  <Button
                    size="large"
                    onClick={() => removeFromCart(item.id, item.categoryId)}
                    sx={{
                      fontFamily: "Shabnam",
                      color: "red",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                      padding: 0,
                      width: "fit-content",
                      "&:hover": {
                        color: "#c51017",
                      },
                    }}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h3 className="text-xl font-semibold mb-4">خلاصه سبد</h3>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span>جمع کل</span>
              <span>
                {new Intl.NumberFormat("fa-IR")
                  .format(cartTotal)
                  .replace(/٬/g, ",")}{" "}
                تومان
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span>هزینه ارسال</span>{" "}
              <span>
                {" "}
                {new Intl.NumberFormat("fa-IR")
                  .format(shippingCost)
                  .replace(/٬/g, ",")}{" "}
                تومان
              </span>
            </div>
            <div className="flex justify-between py-2 font-semibold text-lg">
              <span>کل پرداختی</span>
              <span>
                {new Intl.NumberFormat("fa-IR")
                  .format(cartTotal + shippingCost)
                  .replace(/٬/g, ",")}{" "}
                تومان
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                تسویه حساب
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
