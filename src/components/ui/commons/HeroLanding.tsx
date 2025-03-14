"use client";
import { constants } from "@/lib/constants";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import React from "react";
import Image from "next/image";

const HeroLanding = () => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="flex h-[400px] w-full items-center justify-center bg-gray-500"
      >
        <SwiperSlide className="mx-auto h-full w-full items-center justify-center">
          <Image
            alt=""
            src="/assets/img/slider1.png"
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            alt=""
            src="/assets/img/slider2.png"
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            alt=""
            src="/assets/img/slider3.png"
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </SwiperSlide>
      </Swiper>
      <div className="isolate bg-slate-50 pb-20 pt-14">
        <div className=" ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl text-left">
              <h1 className="text-title">{constants.appName}</h1>
              <p className="mt-6 py-3 text-lg leading-8 text-gray-800">
                {constants.appResume}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroLanding;
