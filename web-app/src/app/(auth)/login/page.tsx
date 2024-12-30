import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full px-4 py-4">
        <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5  flex justify-between items-center py-4 ">
          <Link
            href="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D]"
          >
            COOKSY
          </Link>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block">Don't have an account? </span>
            <Link
              href="/signup"
              className="text-main-btn underline underline-offset-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="xl:text-6xl text-5xl font-bold xl:mb-8 mb-6 text-navigation-text">
              Log In
            </h1>
            <p className="text-muted-foreground">
              Welcome back, chef! Access your recipes and cooking adventures.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="w-full border-input border-main-paragraph-text rounded-none focus:border-main-btn focus:ring-main-btn "
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                className="w-full border-input border-main-paragraph-text rounded-none focus:border-main-btn focus:ring-main-btn "
              />
            </div>

            <Button className="w-full bg-main-btn hover:bg-second-btn text-white py-6">
              Log In
            </Button>

            {/* <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-main-btn"
              >
                Forgot your password?
              </Link>
            </div> */}
          </div>

          <div className="text-center text-sm text-muted-foreground mt-8">
            © 2024 Cooksy
          </div>
        </div>
      </div>
    </div>
  );
}
