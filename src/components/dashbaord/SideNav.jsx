"use client";

import { Button } from "@heroui/react";
import clsx from "clsx";

import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings,
  Users,
  ShoppingBag,
  Heart,
  MapPin,
  Package,
  ShoppingCart,
  DollarSign,
  UserCog,
  Store,
  FileText,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "../../lib/auth-client";
import Image from "next/image";

import lexiCart from "../../../public/images/lexi-cart.png";

const SideNav = ({
  collapsed,
  setCollapsed,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [user, isPending, router]);

  if (isPending) return null;
  if (!user) return null;

  const menuItems = {
    reader: [
      { name: "Profile", href: "/dashboard/profile", icon: Users },
      { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
      { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
      { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
    ],

    librarian: [
      { name: "Profile", href: "/dashboard/profile", icon: Users },
      { name: "Products", href: "/dashboard/products", icon: Package },
      { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { name: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],

    admin: [
      { name: "Profile", href: "/dashboard/profile", icon: Users },
      { name: "Users", href: "/dashboard/users", icon: UserCog },
      { name: "Sellers", href: "/dashboard/sellers", icon: Store },
      { name: "Products", href: "/dashboard/products", icon: Package },
      { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { name: "Reports", href: "/dashboard/reports", icon: FileText },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  };

  const navigation = menuItems[role] || [];
  
  return (
    <aside
      className={clsx(
        "h-full border-r flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3">
            <Image src={lexiCart} width={100} height={100} alt="LexiCart"/>
        </Link>
        )}
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navigation.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 mb-2 rounded-lg text-sm transition",
                  active
                    ? "bg-gray-100 text-slate-700"
                    : "hover:bg-gray-100 hover:text-slate-700 text-slate-700",
                  collapsed && "justify-center",
                )}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t text-xs text-gray-500">
        {!collapsed ? "Admin Panel v1.0" : "v1"}
      </div>
    </aside>
  );
}

export default SideNav;