import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session=await auth()
  return (
    <div>
      <main>
        <SessionProvider session={session}>
        <Header />
        {children}
        <Footer />
        </SessionProvider>
      </main>
    </div>
  );
};

export default Layout;
