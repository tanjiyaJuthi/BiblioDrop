"use client";

import {
  Button,
  Input,
  Link,
} from "@heroui/react";

import {
  PhoneCall,
  Mail,
  Clock3,
  MapPin,
  Send,
  ChevronUp,
  ChevronRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import lexiCart from "../../public/images/lexi-cart.png";
import Image from "next/image";

const contactItems = [
  {
    icon: PhoneCall,
    label: "Call Us 24/7",
    value: "+111-111-111",
  },
  {
    icon: Mail,
    label: "Make a Quote",
    value: "quote@laxi-cart.com",
  },
  {
    icon: Clock3,
    label: "Opening Hour",
    value: "Sunday - Fri: 9 AM - 6 PM",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "000 Washington Ave.",
  },
];

const supportLinks = [
  "Store List",
  "Opening Hours",
  "Return Policy",
];

const quickLinks = [
  "About",
  "Contact Us",
  "Privacy Policy",
];

function FooterTitle({ title }) {
  return (
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="mt-2 h-[2px] w-10 bg-[#5d1bb6]" />
    </div>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <FooterTitle title={title} />

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="group flex items-center gap-2 text-white"
            >
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#ef0161] text-white">
      <section className="border-b border-white/10 mx-auto max-w-7xl px-5 lg:px-0">
        <div className="container mx-auto py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/40">
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="text-sm">
                      {item.label}
                    </p>
                    <p className="font-semibold">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-white/20" />

      <section className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="container mx-auto py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Link href="/">
                  <Image src={lexiCart} width={200} height={200} alt="Lexi Cart" />
                </Link>
              </div>

              <p className="mb-6 text-sm leading-relaxed">
                Empowering knowledge through digital library management.
              </p>

              <div className="flex gap-3">
                {[FaFacebookF, FaTwitter, FaXTwitter, FaYoutube, FaLinkedinIn].map(
                  (Icon, index) => (
                    <Button
                      key={index}
                      isIconOnly
                      variant="bordered"
                      className="bg-[#5d1bb6] border-white/20 text-white "
                    >
                      <Icon size={18} />
                    </Button>
                  )
                )}
              </div>
            </div>

            <FooterLinks
              title="Customer Support"
              links={supportLinks}
            />

            <FooterLinks
              title="Quick Links"
              links={quickLinks}
            />

            <div>
              <FooterTitle title="Newsletter" />

              <p className="mt-6 mb-6 text-sm">
                Sign up for our weekly newsletter to get
                the latest updates.
              </p>

              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter Email Address"
                  variant="bordered"
                  className="bg-white border-white/20"
                />

                <Button
                  isIconOnly
                  className="bg-[#5d1bb6] text-white"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-white/20" />

      <section className="relative mx-auto max-w-7xl px-5 lg:px-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm">
            © All Copyright 2026 by{" "}
            <Link href="/">
              <Image src={lexiCart} width={100} height={100} alt="Lexi Cart" />
            </Link>
          </p>

          <div className="flex gap-3">
            {["VISA", "MC", "PAYPAL", "AMAZON"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <Button
          isIconOnly
          onPress={scrollToTop}
          className="absolute right-8 -top-6 bg-[#5d1bb6] text-white shadow-lg"
        >
          <ChevronUp size={18} />
        </Button>
      </section>
    </footer>
  );
}

export default Footer;