"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuSquareIcon } from "lucide-react";
import NavLinks from "./NavLinks";

export default function NavLinksSheet() {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <div className="h-10 w-10 items-center justify-center rounded-xl bg-slate-200 p-2">
          <MenuSquareIcon />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="bg-red-600">
        <div className="flex flex-col gap-4 py-4">
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
}
