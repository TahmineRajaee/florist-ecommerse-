import React from "react";
import Carousel from "@/components/carousel";

async function getCategories(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("اطلاعات دریافت نشد!");
  }
  const data = await response.json();
  return data.categories;
}

export default async function Home() {
  const categories = await getCategories(
    "https://raw.githubusercontent.com/TahmineRajaee/florist/main/data.json"
  );

  return (
    <section className="flex flex-wrap w-full">
      <h1 className="flex relative w-full h-[50vh] header-bg1 bg-cover bg-center text-white text-2xl md:text-3xl font-bold">
        <span className="flex justify-center items-center absolute top-0 z-10 left-0 w-full h-full">
          گل‌فروشی آنلاین گل با ما
        </span>
      </h1>
      <h2 className="flex justify-center py-5 md:py-7 w-full text-xl md:text-2xl font-bold">
        دسته‌بندی‌ها
      </h2>

      <div className="w-full p-5 md:p-7">
        <Carousel categories={categories} />
      </div>
    </section>
  );
}
