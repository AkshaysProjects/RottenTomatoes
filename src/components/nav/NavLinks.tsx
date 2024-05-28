"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((navLink) => (
        <Link
          key={navLink.url}
          className={`mx-2 flex h-4/5 items-center rounded-xl px-4 py-4 text-center font-bold text-white hover:bg-red-800 ${
            pathname === navLink.url ? "bg-red-700" : ""
          }`}
          href={navLink.url}
        >
          <span className="flex items-center">{navLink.label}</span>
        </Link>
      ))}
    </>
  );
}
