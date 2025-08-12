import React from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function Footer() {
  return (
    <section className="flex flex-wrap w-full bg-gray-300 p-2 md:p-4 shadow-inner shadow-gray-400/20">
      <h2 className="w-full p-2 md:p-4 text-xl sm:text-2xl md:text-3xl text-[#5d5d5d] font-bold">
        گل فروشی گل با ما
      </h2>
      <p className="w-full p-2 md:p-4 text-sm sm:text-base md:text-lg text-[#5d5d5d]">
        سفارش آنلاین انواع گل و گیاه زینتی و آپارتمانی، تاج گل، دسته گل، باکس
        گل، سبد گل برای مناسبت‎‌های مختلف با بهترین قیمت و ارسال فوری در شهر
        تهران.
      </p>
      <p className="w-full p-2 md:p-4">
        <LocationPinIcon
          sx={{
            fontSize: { xs: "24px", md: "30px" },
            color: "#5d5d5d",
          }}
        />
        <span className="pr-2 text-[#5d5d5d] text-sm sm:text-base md:text-lg">
          بازار گل محلاتی
        </span>
      </p>
      <p className="w-full p-2 md:p-4">
        <LocalPhoneIcon
          sx={{
            fontSize: { xs: "24px", md: "30px" },
            color: "#5d5d5d",
          }}
        />
        <span className="pr-2 text-[#5d5d5d] text-sm sm:text-base md:text-lg">
          09121234567
        </span>
      </p>
    </section>
  );
}
