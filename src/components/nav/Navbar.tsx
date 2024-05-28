import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import AvatarDropdown from "./AvatarDropdown";
import NavLinks from "./NavLinks";
import Search from "./Search";

export interface INavbarProps {}

export async function Navbar(props: INavbarProps) {
  // Get the Auth session
  const session = await auth();

  // Get authentication status
  const isAuthenticated = session?.user ? true : false;

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
      <Search />
      <div className="max-w-auto flex h-full items-center justify-end">
        <NavLinks />
        {isAuthenticated ? (
          <AvatarDropdown />
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
