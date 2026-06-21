"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import lexiCart from "../../public/images/lexi-cart.png";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  }

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Books",
      href: "/books",
    },
    {
      label: "Contact Us",
      href: "/contact",
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-0">
        <Link href="/" className="flex items-center gap-3">
            <Image src={lexiCart} width={200} height={200} alt="BibliDrop"/>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "text-[#ef0161]"
                          : "hover:text-[#ef0161]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-6 w-px bg-white/20" />

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-medium">
                    Hi, {user.name}!
                  </span>

                  <Button
                    onClick={handleSignOut}
                    className="rounded-2xl"
                    variant="ghost"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-[#ef0161] transition hover:text-[#5d1bb6]"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="relative overflow-hidden h-9.5 px-6 text-sm font-semibold text-white rounded-xl bg-[#ef0161] group flex items-center"
                  >
                    <span className="relative z-10">
                      Get Started
                    </span>

                    <span
                      className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 transition md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-black/5 md:hidden">
          <div className="space-y-3 px-4 py-6">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 h-9.5 text-base font-medium transition ${
                        isActive
                          ? "text-[#ef0161]"
                          : "hover:text-[#ef0161]"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ml-5 font-semibold">
              <div className="flex flex-col gap-5">
                <Link
                  href="/signin"
                  className="hover:text-[#ef0161] inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Link
                    href="/signup"
                    className="hover:text-[#ef0161] inline-block"
                >
                  <span className="relative z-10">
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}