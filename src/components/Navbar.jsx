"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import lexiCart from "../../public/images/lexi-cart.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  }

  const navLinks = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-[#ef0161]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-6 w-px bg-white/20" />

            <div className="flex items-center gap-4">
              {
                user ?
                  <>
                    Hi, {user.name}!
                    <Button onClick={handleSignOut}
                      variant="ghost">Sign Out</Button>
                  </>
                  :
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-[#ef0161] transition hover:text-[#5d1bb6]"
                  >
                    Sign In
                  </Link>}
              <Button
                as={Link}
                href="/signup"
                radius="lg"
                className="py-3 bg-[#ef0161] px-6 text-sm font-semibold text-white rounded-xl hover:bg-[#5d1bb6]"
              >
                Get Started
              </Button>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
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
        <div className="border-t border-white/10 md:hidden">
          <div className="space-y-3 px-4 py-6">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Button
                  as={Link}
                  href="/register"
                  className="bg-white font-semibold text-black"
                  radius="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}