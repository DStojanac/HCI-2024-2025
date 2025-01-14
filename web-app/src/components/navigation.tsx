"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { X, User  } from "lucide-react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import type { Session } from "next-auth";
type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Recipes",
    path: "/recipes",
  },
  {
    title: "Blog Posts",
    path: "/blog",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Log In",
    path: "/login",
  },
  {
    title: "Sign Up",
    path: "/signup",
  },
  {
    title: "Account",
    path: "/account",
  },
  {
    title:"Sign Out",
    path:"/",
  }
];

function Hamburger({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="flex md:hidden flex-col justify-center items-end w-11 h-11 p-2 space-y-1.5 rounded-sm "
      aria-label="Open menu"
      onClick={onClick}
    >
      <span className="w-7 h-1 bg-main-btn rounded-full" />
      <span className="w-4 h-1 bg-main-btn rounded-full" />
      <span className="w-6 h-1 bg-main-btn rounded-full" />
    </button>
  );
}

function processPage(page: Page, index: number, pathName: string, session: Session | null, status: string) {
  const isLogin = page.path === "/login";
  const isSignUp = page.path === "/signup";
  const isActive = page.path === pathName;
  const isAccount = page.path === "/account";
  const isSignOut = page.title === "Sign Out";
  
  const signOut = () => {
    logout()
  }

  if (isSignOut && status === "authenticated" && session?.user) {
    return (
      <li key={index}>
        <button onClick={signOut} type="submit" className="bg-main-btn text-white px-5 py-2.5 border border-main-background rounded-md hover:bg-second-btn w-full block text-center">Sign Out</button>
      </li>
    )
  }

  if (status === "authenticated" && (isLogin || isSignUp) || status === "unauthenticated" && isAccount || status === "unauthenticated" && isSignOut) {
    return null
  }

  if (status === "authenticated" && isAccount){
    return (
      <li key={index}>
        <Link href={page.path} className="rounded-full border-2 p-1 flex items-center justify-center">
          <User />
        </Link>
      </li>
    )
  }

  return (
    <li className="hover:text-navigation-text" key={index}>
      <Link
        href={page.path}
        className={`
          ${
            isActive && !isLogin && !isSignUp
              ? "font-bold text-navigation-text"
              : isActive
              ? "text-navigation-text"
              : ""
          }
        ${
          isLogin 
            ? "text-second-paragraph-text border border-second-paragraph-text px-5 py-2.5 rounded-md hover:bg-gray-100 w-full block text-center"
            : ""
        }
        ${
          isSignUp 
            ? "bg-main-btn text-white px-5 py-2.5 border border-main-background rounded-md hover:bg-second-btn w-full block text-center"
            : ""
        }
      `}
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const { data: session, status } = useSession()
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // 768px is the md breakpoint in Tailwind
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationLinks = pages.filter(
    (page) => page.path !== "/login" && page.path !== "/signup" && page.path !== "/account" && page.title !== "Sign Out"
  );
  const authLinks = pages.filter(
    (page) => page.path === "/login" || page.path === "/signup" || page.path === "/account" || page.title === "Sign Out"
  );

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex md:space-x-4 lg:space-x-9 text-sm md:text-base items-center">
        {pages.map((page, index) => processPage(page, index, pathName, session, status))}
      </ul>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Hamburger onClick={() => setIsOpen(true)} />

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        )}

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 w-full h-full bg-main-background z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Header with COOKSY Logo and Close Button */}
            <div className="flex justify-between items-center mb-4">
              {/* COOKSY Logo */}
              <Link
                href="/"
                className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D]"
              >
                COOKSY
              </Link>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-main-btn" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4 mt-4">
              {navigationLinks.map((page, index) => (
                <li key={index} className="hover:text-navigation-text">
                  <Link
                    href={page.path}
                    className={`block py-2 ${
                      page.path === pathName
                        ? "font-bold text-navigation-text"
                        : ""
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <ul className="mt-auto space-y-4 mb-8">
              {authLinks.map((page, index) =>
                processPage(page, index, pathName, session, status)
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
