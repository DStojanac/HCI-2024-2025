import { Navigation } from "@/app/components/navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-main-background ">
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5 flex justify-between items-center md:h-[96px] ">
        <Link
          href="/"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D]"
        >
          COOKSY
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
