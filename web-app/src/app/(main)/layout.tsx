import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FavoritesProvider } from "@/contexts/favoritesContext";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div>
      <main>
        <SessionProvider session={session}>
          <FavoritesProvider>
            <Header />
            <NuqsAdapter>{children}</NuqsAdapter>
            <Footer />
          </FavoritesProvider>
        </SessionProvider>
      </main>
    </div>
  );
};

export default Layout;
