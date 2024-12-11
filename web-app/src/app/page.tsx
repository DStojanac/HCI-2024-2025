import { Navigation } from "./components/navigation";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <div className="flex justify-between pt-8 px-8">
          <div>COOKSY</div>
          <Navigation />
        </div>
        <div className="flex flex-grow  items-center justify-center">
          <h1 className=" text-6xl font-extrabold tracking-tight text-center">
            Home page
          </h1>
        </div>
      </main>
    </>
  );
}
