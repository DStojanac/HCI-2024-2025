import Link from "next/link";

export default function CTASection() {
  return (
    <section className=" py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-20 md:px-10 sm:px-5">
        <div className="text-center max-w-full">
          <h2 className="text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-main-paragraph-text leading-tight mb-8">
            Unlock Your Cooking Experience
          </h2>
          <p className="text-xl xl:text-2xl text-second-paragraph-text mb-14">
            Join us today to personalize your cooking journey and save your
            favorite recipes effortlessly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-main-btn text-white-text px-8 py-4 border border-main-background rounded-md hover:bg-second-btn block text-center text-xl"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="text-second-paragraph-text border border-second-paragraph-text px-8 py-4 rounded-md hover:bg-gray-200  block text-center text-xl"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
