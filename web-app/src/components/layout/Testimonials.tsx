"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24 bg-main-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
        className="text-center max-w-3xl mx-auto mb-20 2xl:mb-24"
      >
        <motion.h2
          variants={itemAnimation}
          className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text mb-8"
        >
          Customer Testimonials
        </motion.h2>
        <motion.p
          variants={itemAnimation}
          className="text-xl xl:text-2xl text-second-paragraph-text"
        >
          Cooksy has transformed my cooking experience completely!
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
        className="grid grid-cols-1 md:grid-cols-3 md:gap-16 gap-20"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemAnimation}
            className="flex flex-col items-center text-center"
          >
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-8"
            >
              <p className="text-xl xl:text-2xl font-semibold text-main-paragraph-text">
                &quot;{testimonial.quote}&quot;
              </p>
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-16 h-16 mb-4">
                <Image
                  src={testimonial.author.image || "/placeholder.svg"}
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
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
