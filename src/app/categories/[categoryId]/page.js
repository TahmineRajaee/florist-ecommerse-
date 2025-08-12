import React from "react";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

async function getCategoriesData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/TahmineRajaee/florist/main/data.json"
  );
  if (!response.ok) throw new Error("اطلاعات دریافت نشد!");
  return response.json();
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { categoryId } = resolvedParams;

  const data = await getCategoriesData();

  const category = data.categories.find(
    (cat) => cat.id.toString() === categoryId
  );

  if (!category) {
    return (
      <h3 className="flex w-full items-center justify-center p-5 md:p-7 text-xl md:text-2xl text-gray-500">
        دسته بندی یافت نشد
      </h3>
    );
  }

  return (
    <section className="flex flex-wrap w-full">
      <h2 className="flex relative w-full h-[50vh] header-bg2 bg-cover bg-center text-white text-2xl md:text-3xl font-bold">
        <span className="flex justify-center items-center absolute top-0 z-10 left-0 w-full h-full">
          {category.title}
        </span>
      </h2>
      <h3 className="flex w-full mt:2 md:mt-4 p-5 md:p-7 text-xl md:text-2xl text-gray-500">
        {new Intl.NumberFormat("fa-IR").format(category.products?.length ?? 0)}{" "}
        محصول موجود است:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5 md:p-7">
        {category.products?.map((prod) => (
          <Link
            key={prod.id}
            href={`/categories/${categoryId}/products/${prod.id}`}
            className="hover:shadow-lg transition-shadow"
          >
            <Card sx={{ maxWidth: "100%", height: "100%" }}>
              <CardActionArea sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={prod.image}
                  alt={prod.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {prod.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {new Intl.NumberFormat("fa-IR")
                      .format(prod.price)
                      .replace(/٬/g, ",")}{" "}
                    تومان
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
