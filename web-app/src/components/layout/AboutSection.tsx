"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  const contentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contentAnimation}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8"
          >
            Cooksy: Your Culinary Companion
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contentAnimation}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-second-paragraph-text xl:text-2xl text-xl mb-14"
          >
            At Cooksy, we believe that cooking should be enjoyable and
            accessible for everyone. Our platform offers a vast collection of
            recipes, tips, and resources to help you create delightful meals, no
            matter your skill level.
          </motion.p>
        </div>

        {/* Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageAnimation}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative aspect-[4/3] md:aspect-square">
            <Image
              src="/images/About.jpg"
              alt="Person cooking"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
