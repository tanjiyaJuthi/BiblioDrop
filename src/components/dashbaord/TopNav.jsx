"use client";

import { authClient, useSession } from "../../lib/auth-client";
import { getInitials } from "../../lib/helper/helper";
import {
  Button,
  Input,
  Dropdown,
  Avatar,
  Label
} from "@heroui/react";
import { Menu, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

export default function TopNav({ 
  collapsed,
  setCollapsed,
 }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <header className="h-16 shadow-xs flex items-center justify-between px-4">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          onPress={() => setCollapsed(!collapsed)}
        >
          <Menu />
        </Button>

        <Input placeholder="Search..." className="w-64 hidden md:flex" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Button isIconOnly variant="light">
          <Bell />
        </Button>

        <Dropdown>
          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar size="sm" aria-label="Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt="John Doe"
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover className="mt-2 rounded-xl">
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
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
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="new-file" textValue="New file" className="hover:rounded-xl hover:text-[#ef0161] hover:bg-[#ef0161]/10">
                      <Link
                        className="flex items-center gap-2"
                        href={`/dashboard/${user?.role}`}
                      >
                        <MdDashboard />
                        <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="copy-link" textValue="Copy link" className="hover:rounded-xl hover:text-[#ef0161] hover:bg-[#ef0161]/10">
                      <CgProfile />
                      <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="delete-file"
                      textValue="Delete file"
                      onClick={handleLogout}
                      className="text-slate-600 hover:rounded-xl hover:text-[#ef0161] hover:bg-[#ef0161]/10"
                    >
                      <BiLogOut />
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}