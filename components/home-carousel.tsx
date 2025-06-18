"use client"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Image from "next/image"
import Carousel1 from "./../assets/home/carousel_1.webp"
import Carousel2 from "./../assets/home/carousel_2.webp"
import Carousel3 from "./../assets/home/carousel_3.webp"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const carouselImages = [
  {
    src: Carousel1.src,
    alt: "A image of a man wearing a shirt",
  },
  {
    src: Carousel2.src,
    alt: "A image of a man wearing a shirt",
  },
  {
    src: Carousel3.src,
    alt: "A image of a man wearing a shirt",
  },
]

export default function HomeCarousel() {
  return (
    <div data-testid="home-carousel" className="relative w-full h-[400px] bg-gray-100">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={1000}
        arrows
        containerClass="h-[600px]"
        itemClass="h-[600px]"
        renderButtonGroupOutside={false}
      >
        {carouselImages?.map((img, idx) => (
          <div key={idx} className="relative w-full h-[600px] flex items-center justify-center">
            <Image
              src={img.src}
              alt={`Banner ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
