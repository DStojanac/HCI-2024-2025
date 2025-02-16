"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function CTASection() {
  const { data: session } = useSession();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-20 md:px-10 sm:px-5">
        <div className="text-center max-w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8"
          >
            {session
              ? "Enhance Your Cooking Journey"
              : "Unlock Your Cooking Experience"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl xl:text-2xl text-second-paragraph-text mb-14"
          >
            {session
              ? "Explore new recipes, save your favorites, and continue your culinary adventure."
              : "Join us today to personalize your cooking journey and save your favorite recipes effortlessly."}
          </motion.p>
          <div className="flex justify-center gap-4">
            {session ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/recipes"
                    className="bg-main-btn text-white-text px-8 py-4 border-main-background rounded-md hover:bg-second-btn block text-center text-xl transition-colors duration-300"
                  >
                    Explore Recipes
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/account"
                    className="text-second-paragraph-text border border-second-paragraph-text px-8 py-4 rounded-md hover:bg-gray-200 block text-center text-xl transition-colors duration-300"
                  >
                    My Account
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="bg-main-btn text-white-text px-8 py-4 border-main-background rounded-md hover:bg-second-btn block text-center text-xl transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="text-second-paragraph-text border border-second-paragraph-text px-8 py-4 rounded-md hover:bg-gray-200 block text-center text-xl transition-colors duration-300"
                  >
                    Log In
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
