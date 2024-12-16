import { Navigation } from "./components/navigation";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen ">
        <div className=" md:h-[96px] flex justify-between items-center lg:px-20 md:px-10 sm:px-5">
          <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D]">
            COOKSY
          </div>
          <Navigation />
        </div>
        <div className="flex flex-grow  items-center justify-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-center">
            Home Page
          </h1>
        </div>
      </main>
    </>
  );
}
