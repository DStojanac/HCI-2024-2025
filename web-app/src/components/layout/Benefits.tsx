"use client";

import Image from "next/image";
import { ChefHat, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Benefits() {
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
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageAnimation}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] md:aspect-square">
              <Image
                src="/images/Benefits.png"
                alt="Hands preparing dough with flour"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg grayscale"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={contentAnimation}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8"
            >
              Discover the Delicious Benefits of Using Cooksy
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={contentAnimation}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-second-paragraph-text xl:text-2xl text-xl mb-14"
            >
              Cooksy offers easy access to a vast collection of recipes, making
              meal planning a breeze. With our user-friendly interface, you can
              find your next favorite dish in no time.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={featureAnimation}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-5"
              >
                <div>
                  <motion.div
                    className="p-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChefHat className="w-20 h-14 text-second-paragraph-text mb-3" />
                  </motion.div>
                  <h3 className="font-semibold text-2xl mb-2">
                    Recipe Variety
                  </h3>
                  <p className="text-black-text text-xl">
                    Explore countless recipes tailored to every taste and
                    dietary preference.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={featureAnimation}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start gap-4"
              >
                <div>
                  <motion.div
                    className="p-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <User className="w-20 h-14 text-second-paragraph-text mb-3" />
                  </motion.div>
                  <h3 className="font-semibold text-2xl mb-2">User-Friendly</h3>
                  <p className="text-black-text text-xl">
                    Navigate effortlessly through our platform, designed for
                    users of all skill levels.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
