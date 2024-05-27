"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function AvatarDropdown() {
  // Get the Auth session
  const session = useSession();

  return (
    <div className="ml-10 mr-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={session.data?.user?.image || "/avatar.png"} />
            <AvatarFallback>{session.data?.user?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-64 flex-col items-center gap-1 rounded-2xl">
          <p className="mx-auto justify-between text-sm">Logged in as</p>
          <p className="text-sm font-semibold">
            {session.data?.user?.name || session.data?.user?.email}
          </p>
          <Link href="/api/auth/signout">
            <Button className="mt-2 px-8">Sign Out</Button>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
