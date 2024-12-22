import Image from "next/image";
import { ChefHat, User } from "lucide-react";

export default function Benefits() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] md:aspect-square">
              <Image
                src="/images/Benefits.png"
                alt="Hands preparing dough with flour"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover  grayscale"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 ">
            <h2 className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8">
              Discover the Delicious Benefits of Using Cooksy for Your Cooking
              Adventures
            </h2>
            <p className="text-second-paragraph-text xl:text-2xl text-xl mb-14">
              Cooksy offers easy access to a vast collection of recipes, making
              meal planning a breeze. With our user-friendly interface, you can
              find your next favorite dish in no time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
              <div className="flex items-start gap-5">
                <div>
                  <div className="p-2">
                    <ChefHat className="w-20 h-14 text-second-paragraph-text mb-3" />
                  </div>
                  <h3 className="font-semibold text-2xl mb-2">
                    Recipe Variety
                  </h3>
                  <p className="text-black-text text-xl">
                    Explore countless recipes tailored to every taste and
                    dietary preference.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div>
                  <div className="p-2">
                    <User className="w-20 h-14 text-second-paragraph-text mb-3" />
                  </div>
                  <h3 className="font-semibold text-2xl mb-2">User-Friendly</h3>
                  <p className="text-black-text text-xl">
                    Navigate effortlessly through our platform, designed for
                    users of all skill levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
