import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cooksy",
  description:
    "Learn about Cooksy's mission to make cooking accessible and enjoyable for everyone.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-main-paragraph-text mb-8 text-center">
        About Cooksy
      </h1>

      <div className="space-y-6 text-second-paragraph-text">
        <p>
          Welcome to Cooksy, where culinary passion meets digital innovation.
          Founded in 2023, Cooksy was born from a simple idea: to make cooking
          accessible, enjoyable, and inspiring for everyone, regardless of their
          skill level or experience in the kitchen.
        </p>

        <p>
          At Cooksy, we believe that good food has the power to bring people
          together, create lasting memories, and nourish both body and soul. Our
          mission is to empower home cooks with the tools, knowledge, and
          inspiration they need to create delicious meals and explore the world
          of culinary arts.
        </p>

        <p>What sets Cooksy apart is our commitment to:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Accessibility:</strong> We strive to make cooking
            approachable for everyone, from beginners to seasoned chefs.
          </li>
          <li>
            <strong>Diversity:</strong> Our recipe collection spans various
            cuisines, dietary preferences, and skill levels.
          </li>
          <li>
            <strong>Community:</strong> We foster a supportive community where
            food enthusiasts can share, learn, and grow together.
          </li>
          <li>
            <strong>Innovation:</strong> We continuously improve our platform to
            enhance the cooking and recipe discovery experience.
          </li>
        </ul>

        <p>
          Whether you&apos;re looking for quick weeknight dinners, impressive
          dishes for special occasions, or want to expand your culinary
          horizons, Cooksy is here to guide and inspire you every step of the
          way.
        </p>

        <p>
          Join us on this delicious journey, and let&apos;s make every meal an
          opportunity to create, share, and savor life&apos;s flavors together.
        </p>

        <p className="font-semibold">Happy cooking!</p>

        <p className="italic">- The Cooksy Team</p>
      </div>
    </div>
  );
}
