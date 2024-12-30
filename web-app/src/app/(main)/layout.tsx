import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
