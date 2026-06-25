"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import lexiCart from "../../public/images/lexi-cart.png";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

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
      label: "All Categories",
      href: "/categories",
    },
    {
      label: "Contact Us",
      href: "/contact",
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-0">
        <Link href="/" className="flex items-center gap-3">
            <Image src={lexiCart} width={200} height={200} alt="BibliDrop"/>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-xl px-4 py-2 text-[12px] lg:text-[16px] font-medium transition ${
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
              {!user && (
                <div className="hidden items-center gap-4 md:flex">
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
                </div>
              )}

              {user && (
                <div className="hidden items-center gap-4 md:flex">
                  <Dropdown>
                    <Dropdown.Trigger className="rounded-xl">
                      <Avatar size="sm" aria-label="Menu">
                        <Avatar.Image
                          referrerPolicy="no-referrer"
                          alt={user?.name}
                          src={user?.image || "/images/fallback.jpg"}
                        />
                        <Avatar.Fallback>
                          {user.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                    </Dropdown.Trigger>

                    <Dropdown.Popover className="rounded-xl overflow-hidden shadow-lg mt-5 mr-5">
                      <div className="px-3 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                          <Avatar size="sm">
                            <Avatar.Image
                              alt={user?.name}
                              src={user?.image}
                            />
                            <Avatar.Fallback delayMs={600}>
                              {user.name.charAt(0)}
                            </Avatar.Fallback>
                          </Avatar>

                          <div className="flex flex-col gap-0">
                            <p className="text-sm leading-5 font-medium">
                              {user?.name}
                            </p>

                            <p className="text-xs leading-none text-muted">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Dropdown.Menu
                        className="p-1"
                        onAction={(key) => console.log(`Selected: ${key}`)}
                      >
                        <Dropdown.Item
                          id="new-file"
                          textValue="New file"
                          className="
                            rounded-xl
                            hover:bg-[#ef0161]/10 hover:text-[#ef0161]
                          "
                        >
                          <Link
                            className="flex items-center gap-2 rounded-xl w-full hover:text-[#ef0161]"
                            href={`/dashboard/${user?.role}`}
                          >
                            <MdDashboard />
                            <Label>
                              Dashboard
                            </Label>
                          </Link>
                        </Dropdown.Item>


                        <Dropdown.Item
                          id="delete-file"
                          textValue="Delete file"
                          variant="danger"
                          onClick={handleSignOut}
                          className="
                            rounded-xl
                            hover:bg-[#ef0161]/10 hover:text-[#ef0161]
                          "
                        >
                          <BiLogOut />
                          <Label>
                            SignOut
                          </Label>
                        </Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-2xl p-2 transition md:hidden"
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
          <div className="space-y-5 px-5 py-6">

            {/* Navigation */}
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
                      onClick={() => setIsMenuOpen(false)}
                      className={`block rounded-xl px-4 py-2 text-base font-medium transition ${
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


            {/* Logged In User */}
            {user ? (
              <div className="border-t pt-5 space-y-4">

                <div className="flex items-center gap-3 px-2">
                  <Avatar size="sm">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user.name}
                      src={user.image || "/images/fallback.jpg"}
                    />

                    <Avatar.Fallback>
                      {user.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>


                  <div>
                    <p className="text-sm font-semibold">
                      {user.name}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>


                <Link
                  href={`/dashboard/${user.role}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    flex items-center gap-2
                    rounded-xl
                    px-4 py-2
                    text-sm
                    hover:bg-[#f10262]/10
                    hover:text-[#f10262]
                    transition
                  "
                >
                  <MdDashboard size={18}/>
                  Dashboard
                </Link>


                <button
                  onClick={handleSignOut}
                  className="
                    flex items-center gap-2
                    rounded-xl
                    px-4 py-2
                    text-sm
                    w-full
                    text-left
                    hover:bg-[#f10262]/10
                    hover:text-[#f10262]
                    transition
                  "
                >
                  <BiLogOut size={18}/>
                  Sign Out
                </button>

              </div>
            ) : (

              /* Guest User */
              <div className="border-t pt-5 flex flex-col gap-4">

                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    px-4
                    text-sm
                    font-medium
                    text-[#ef0161]
                    hover:text-[#5d1bb6]
                  "
                >
                  Sign In
                </Link>


                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    mx-4
                    flex
                    justify-center
                    items-center
                    h-10
                    rounded-xl
                    bg-[#ef0161]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#5d1bb6]
                    transition
                  "
                >
                  Get Started
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}