"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function Carousel({ categories }) {
  return (
    <Swiper
      grabCursor={true}
      navigation={true}
      modules={[Navigation]}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        390: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      {categories?.map((cat) => (
        <SwiperSlide key={cat.id}>
          <Link
            href={`/categories/${cat.id}`}
            className="flex flex-wrap border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={cat.image}
                  alt={cat.title}
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
                    }}
                  >
                    {cat.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
