import Image from "next/image";
import { BookOpen, FolderClosed, Globe } from "lucide-react";

export default function SaveAndOrganize() {
  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2  ">
          <h2 className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8">
            Easily Save and Organize Your Favorite Recipes for Quick Access
          </h2>
          <p className="text-second-paragraph-text xl:text-2xl text-xl mb-14">
            With Cooksy, you can effortlessly save your favorite recipes to
            revisit later. Enjoy a personalized cooking experience that keeps
            your culinary inspirations at your fingertips.
          </p>
          <ul className="space-y-6 ">
            <li className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-second-paragraph-text " />
              <span className="text-xl">
                Never lose track of your best recipes again.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FolderClosed className="w-6 h-6 text-second-paragraph-text " />
              <span className="text-xl">
                Organize your favorites in one convenient place.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-second-paragraph-text " />
              <span className="text-xl">
                Access your saved recipes anytime, anywhere.
              </span>
            </li>
          </ul>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] md:aspect-square">
            <Image
              src="/images/SaveAndOrganize.png"
              alt="Person cooking and looking at recipe"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
