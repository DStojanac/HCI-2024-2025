import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[602px] md:min-h-[calc(100vh-78px)] sm:min-h-[calc(100vh-78px)] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Hero.jpg"
          alt="Table with food"
          fill
          quality={100}
          className="object-cover brightness-100"
        />
        {/* Dark Overlay Layer */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5 z-10">
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
          <p className=" md:block text-lg md:text-xl text-white/90 mb-10 max-w-xl">
            Unleash your inner chef with our diverse collection of recipes,
            tailored for every taste and skill level. Whether you're a beginner
            or a culinary expert, Cooksy has something special just for you!
          </p>
          <Link
            href={"/recipes"}
            className="bg-main-btn rounded hover:bg-second-btn text-white px-8 py-3 text-lg"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}
