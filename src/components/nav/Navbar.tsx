import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import AvatarDropdown from "./AvatarDropdown";
import NavLinks from "./NavLinks";
import NavLinksSheet from "./NavLinksSheet";
import Search from "./Search";

export interface INavbarProps {}

export async function Navbar(props: INavbarProps) {
  // Get the Auth session
  const session = await auth();

  // Get authentication status
  const isAuthenticated = session?.user ? true : false;

  return (
    <nav className="sticky top-0 z-50 flex h-[100px] w-full items-center justify-center gap-12 bg-red-600">
      <div className="ml-8 block md:hidden">
        <NavLinksSheet />
      </div>
      <Link
        href="/"
        className="relative hidden h-full w-48 flex-shrink-0 lg:block"
      >
        <Image
          src="/logo.png"
          alt="RottenTomatoes"
          fill
          className="object-contain px-4 py-6"
          priority
          sizes="100%"
        />
      </Link>
      <Search />
      <div className="max-w-auto flex h-full items-center justify-end">
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        {isAuthenticated ? (
          <AvatarDropdown />
        ) : (
          <Link
            href="/auth/login"
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
