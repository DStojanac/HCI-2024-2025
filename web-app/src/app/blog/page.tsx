import { Navigation } from "../components/navigation";

export default function BlogPage() {
  return (
    <>
      <main className="flex flex-col min-h-screen overflow-hidden">
        <div className="flex w-full justify-end p-8">
          <Navigation />
        </div>
        <div className="flex flex-grow items-center justify-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-center">
            Blog page
          </h1>
        </div>
      </main>
    </>
  );
}
