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

function processPage(page: Page, index: number, pathName: string) {
  return (
    <li key={index}>
      <Link
        href={page.path}
        className={pathName === page.path ? "font-bold" : ""}
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
      <ul className="flex space-x-4 mb-4">
        {pages.map((page, index) => processPage(page, index, pathName))}
      </ul>
    </>
  );
}
