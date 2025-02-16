import NextAuth from "next-auth";
import authConfig from "@/auth.config";
// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  sanityStudioRoute,
} from "./routes";

const { auth } = NextAuth(authConfig);
// const secret = process.env.AUTH_SECRET;

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace("*", ".*")}$`);
    return regex.test(nextUrl.pathname);
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isSanityStudioRoute = nextUrl.pathname.startsWith(sanityStudioRoute);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isSanityStudioRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }

    // Decoding token to get role from logged in user
    // const token = await getToken({ req, secret });
    // const userRole = token?.role;

    // if (userRole !== "admin") {
    //   return Response.redirect(new URL("/", nextUrl));
    // }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Check if the route exists in the application
    const routeExists = [...publicRoutes, ...authRoutes].some((route) => {
      const regex = new RegExp(`^${route.replace("*", ".*")}$`);
      return regex.test(nextUrl.pathname);
    });

    if (!routeExists) {
      // If the route doesn't exist, return a 404 response
      return NextResponse.rewrite(new URL("/404", nextUrl));
    }

    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
