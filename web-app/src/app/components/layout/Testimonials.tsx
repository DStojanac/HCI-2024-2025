import Image from "next/image";

type Testimonial = {
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Cooksy has revolutionized the way I cook. It's easy to find and save recipes, and the platform makes cooking so much more enjoyable.",
    author: {
      name: "Emily Johnson",
      role: "Home Cook, Blogger",
      image: "/images/Emily_Johnson.png",
    },
  },
  {
    quote:
      "With Cooksy, I can explore a wide variety of recipes that fit my clients' needs. It's user-friendly and truly inspiring!",
    author: {
      name: "Michael Smith",
      role: "Nutritionist, Author",
      image: "/images/Michael_Smith.png",
    },
  },
  {
    quote:
      "Cooksy has brought new excitement to my kitchen. Saving recipes and discovering new dishes has never been this fun!",
    author: {
      name: "Patricia King",
      role: "Teacher, Retired",
      image: "/images/Patricia_King.jpeg",
    },
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-main-background">
      <div className="text-center max-w-3xl mx-auto mb-20 2xl:mb-24">
        <h2 className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text mb-8">
          Customer Testimonials
        </h2>
        <p className="text-xl xl:text-2xl text-second-paragraph-text">
          Cooksy has transformed my cooking experience completely!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16 gap-20">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <blockquote className="mb-8">
              <p className="text-xl xl:text-2xl font-semibold text-main-paragraph-text">
                "{testimonial.quote}"
              </p>
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-4">
                <Image
                  src={testimonial.author.image}
                  alt={testimonial.author.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 64px, 64px"
                />
              </div>
              <div>
                <p className="font-semibold xl:text-xl text-xl text-main-paragraph-text">
                  {testimonial.author.name}
                </p>
                <p className="xl:text-xl text-lg text-second-paragraph-text">
                  {testimonial.author.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
