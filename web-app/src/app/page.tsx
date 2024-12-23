import Hero from "./components/layout/Hero";
import SaveAndOrganize from "./components/layout/SaveAndOrganize";
import Benefits from "./components/layout/Benefits";
import Testimonials from "./components/layout/Testimonials";
import CTASection from "./components/layout/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        <SaveAndOrganize />
      </div>
      <div className="bg-second-background">
        <Benefits />
      </div>
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        <Testimonials />
      </div>

      <div className="bg-second-background">
        <CTASection />
      </div>
    </main>
  );
}
