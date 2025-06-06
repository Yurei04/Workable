"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import CardBlog from "@/components/ui/cardBlog"

export default function Blog({ className, ...props }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const caroselImg = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.png",
    "/images/image4.png",
  ]
  
  return (
    <div className="w-full items-center text-center justify-center mt-16" id="blog">
      <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white m-2">
        Blogs
      </h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[300px]">
          {caroselImg.map((image, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="relative w-full h-[150px] rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="items-center justify-center">
        <CardBlog />
      </div>

    </div>
  )
}
