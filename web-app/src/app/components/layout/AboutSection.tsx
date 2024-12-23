import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2  ">
          <h2 className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8">
            Discover Cooksy: Your ultimate destination for delicious recipes and
            culinary inspiration.
          </h2>
          <p className="text-second-paragraph-text xl:text-2xl text-xl mb-14">
            At Cooksy, we believe that cooking should be enjoyable and
            accessible for everyone. Our platform offers a vast collection of
            recipes, tips, and resources to help you create delightful meals, no
            matter your skill level.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] md:aspect-square">
            <Image
              src="/images/About.jpg"
              alt="Person cooking"
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
