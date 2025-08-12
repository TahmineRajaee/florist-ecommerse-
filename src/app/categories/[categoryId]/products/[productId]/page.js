import React from "react";
import Link from "next/link";
import ProductDetails from "@/components/ProductDetails";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

async function getProductsData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/TahmineRajaee/florist/main/data.json"
  );
  if (!response.ok) throw new Error("اطلاعات دریافت نشد!");
  return response.json();
}

export default async function ProductPage({ params }) {
  const { categoryId, productId } = await params;
  const data = await getProductsData();

  const category = data.categories.find(
    (cat) => cat.id.toString() === categoryId.toString()
  );

  const product = category?.products?.find(
    (prod) => prod.id.toString() === productId.toString()
  );

  if (!product) {
    return (
      <div className="flex w-full flex-wrap mx-auto p-5 md:p-7">
        <h3 className="flex w-full items-center justify-center py-2 md:py-4 text-xl md:text-2xl text-gray-500">
          دسته بندی یافت نشد
        </h3>
        <Link
          href={`/categories/${categoryId}`}
          className="flex items-center justify-center text-blue-600 text-xl md:text-2xl"
        >
          بازگشت به دسته‌بندی
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-wrap w-full p-5 md:p-7">
      <div className="flex w-full pb-2 md:pb-4">
        <Link href={`/categories/${categoryId}`} className="text-gray-600">
          <ExitToAppIcon sx={{ paddingLeft: "5px" }} />
          بازگشت به دسته‌بندی
        </Link>
      </div>

      <ProductDetails product={product} categoryId={categoryId} />
    </section>
  );
}
