"use client";

import { navLinks } from "@/constants";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface INavbarProps {}

export function Navbar(props: INavbarProps) {
  // Get the Auth session
  const session = useSession();

  // Simulate authentication state
  const isAuthenticated = session.status === "authenticated";

  // Get the current pathname
  const currentPathname = usePathname();

  return (
    <nav className="flex h-[100px] w-full items-center justify-center gap-12 bg-red-600">
      <Link href="/" className="relative h-full w-48">
        <Image
          src="/logo.png"
          alt="RottenTomatoes"
          fill
          className="object-contain px-4 py-6"
          priority
          sizes="100%"
        />
      </Link>
      <div className="flex w-1/5 items-center justify-between rounded-full border-2 border-white bg-red-800 pl-4 text-white">
        <SearchIcon />
        <Input
          className="focus-visible: w-full rounded-full border-none bg-transparent text-white ring-0 placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          type="search"
          placeholder="Search for Movies and TV Shows"
        />
      </div>
      <div className="max-w-auto flex h-full items-center justify-end">
        {navLinks.map((navLink) => (
          <Link
            key={navLink.url}
            className={`flex h-4/5 items-center px-6 text-center font-bold text-white hover:bg-red-800 ${
              currentPathname === navLink.url ? "bg-red-700" : ""
            }`}
            href={navLink.url}
          >
            <span className="flex items-center">{navLink.label}</span>
          </Link>
        ))}
        {isAuthenticated ? (
          // TODO: Add profile dropdown
          <div>Profile</div>
        ) : (
          <Link
            href="/api/auth/signin"
            className="flex h-4/5 items-center px-6 text-center font-bold text-white"
          >
            <Button className="bg-white text-black hover:bg-gray-200">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
