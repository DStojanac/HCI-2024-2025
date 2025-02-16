import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="text-center max-w-xl">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/images/notFound_image.jpg"
            alt="Decorative wine glass"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <h2 className="text-4xl font-bold mb-4 text-main-paragraph-text">
          Page Not Found
        </h2>
        <p className="mb-8 text-second-paragraph-text text-lg">
          Oops! Looks like this recipe got lost in the kitchen. Let&apos;s get
          you back to cooking!
        </p>
        <Link
          href="/"
          className="inline-block bg-main-btn hover:bg-second-btn text-white px-6 py-3 rounded-md transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
