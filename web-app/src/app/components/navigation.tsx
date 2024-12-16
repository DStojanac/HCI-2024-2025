"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
];

function Hamburger() {
  return (
    <button
      className="flex md:hidden flex-col justify-center items-end w-11 h-11 p-2 space-y-1.5 rounded-sm "
      aria-label="Open menu"
    >
      <span className="w-7 h-1 bg-main-btn rounded-full" />
      <span className="w-4 h-1 bg-main-btn rounded-full" />
      <span className="w-6 h-1 bg-main-btn rounded-full" />
    </button>
  );
}

function processPage(page: Page, index: number, pathName: string) {
  const isLogin = page.path === "/login";
  const isSignUp = page.path === "/signup";
  const isActive = page.path === pathName;

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
              ? "  text-second-paragraph-text border border-second-paragraph-text px-5 py-2.5 rounded-md hover:bg-gray-100"
              : ""
          }
          ${
            isSignUp
              ? "bg-main-btn text-white px-5 py-2.5  border border-main-background  rounded-md hover:bg-second-btn"
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
  const pathName = usePathname();
  return (
    <>
      <ul className=" flex md:space-x-4 lg:space-x-9 text-sm md:text-base  ">
        {pages.map((page, index) => processPage(page, index, pathName))}
        <Hamburger />
      </ul>
    </>
  );
}
