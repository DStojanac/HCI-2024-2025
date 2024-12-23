import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes" },
  { name: "Blog Posts", href: "/blog" },
  { name: "About Us", href: "/about" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookies Settings", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-second-background py-12 xl:py-[116px]">
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center mb-28">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D]"
          >
            COOKSY
          </Link>

          {/* Navigation - Desktop */}
          <nav>
            <ul className="flex space-x-8">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-main-paragraph-text hover:text-navigation-text transition-colors text-lg font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links - Desktop */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-main-paragraph-text hover:text-navigation-text transition-colors font-semibold"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D] mb-14"
          >
            COOKSY
          </Link>

          <nav className="mb-10">
            <ul className="flex flex-col items-center space-y-6">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-main-paragraph-text hover:text-navigation-text transition-colors font-semibold text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex space-x-6 mb-10">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-second-paragraph-text hover:text-navigation-text transition-colors font-semibold"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="md:block w-full h-px bg-black mb-8 " />

        {/*Legal Section */}
        <div className="flex flex-col items-center space-y-4 gap-6">
          <div className="flex flex-col md:flex-row items-center md:justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg text-main-paragraph-text hover:text-navigation-text transition-colors font-semibold underline underline-offset-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-lg text-main-paragraph-text font-semibold">
            © 2024 Cooksy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
