"use client";

import Image from "next/image";
import { BookOpen, FolderClosed, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function SaveAndOrganize() {
  const contentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const featureAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
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
            Save & Organize Your Recipes
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contentAnimation}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-second-paragraph-text xl:text-2xl text-xl mb-14"
          >
            With Cooksy, you can effortlessly save your favorite recipes to
            revisit later. Enjoy a personalized cooking experience that keeps
            your culinary inspirations at your fingertips.
          </motion.p>
          <ul className="space-y-6">
            {[
              {
                icon: BookOpen,
                text: "Never lose track of your best recipes again.",
              },
              {
                icon: FolderClosed,
                text: "Organize your favorites in one convenient place.",
              },
              {
                icon: Globe,
                text: "Access your saved recipes anytime, anywhere.",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={featureAnimation}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon className="w-6 h-6 text-second-paragraph-text" />
                </motion.div>
                <span className="text-xl">{item.text}</span>
              </motion.li>
            ))}
          </ul>
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
          <div className="relative aspect-[4/3] md:aspect-square rounded">
            <Image
              src="/images/saveAndOrg.jpg"
              alt="Person cooking and looking at recipe"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className=" rounded-lg object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
