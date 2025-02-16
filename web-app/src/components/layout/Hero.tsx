"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="relative min-h-[602px] md:min-h-[calc(100vh-78px)] sm:min-h-[calc(100vh-78px)] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Hero_v4.jpg"
          alt="Table with food"
          fill
          quality={75}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, (max-width: 1920px) 90vw, 100vw"
          className={`
            object-cover brightness-100 transition-opacity duration-700
            ${isLoading ? "opacity-0" : "opacity-100"}
          `}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi08QDRBOEE3PC45PVFHSVFaWllCTUJNQklZWVlZWVn/2wBDARUXFyAeIBohHiAhLSotKVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          onLoad={() => setIsLoading(false)}
        />
        {/* Dark Overlay Layer */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5 z-10"
      >
        <div className="max-w-2xl">
          <h1 className="mb-8 flex flex-col space-y-1 md:space-y-4">
            <div className="flex flex-wrap">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-navigation-text mr-4">
                Discover
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Delicious
              </span>
            </div>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-navigation-text">Recipes</span>
              <span className="text-white"> for Every</span>
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white ">
              Occasion
            </span>
          </h1>
          <p className="md:block text-lg md:text-xl text-white/90 mb-10 max-w-xl">
            Unleash your inner chef with our diverse collection of recipes,
            tailored for every taste and skill level. Whether you&apos;re a
            beginner or a culinary expert, Cooksy has something special just for
            you!
          </p>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href={"/recipes"}
              className="bg-main-btn rounded hover:bg-second-btn text-white px-8 py-3 text-lg inline-block transition-colors duration-300"
            >
              Explore
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
