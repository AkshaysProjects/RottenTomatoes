"use client";

import { IMedia } from "@/models";
import { api } from "@/trpc/client";
import { useState } from "react";

export default function Home() {
  const [media, setMedia] = useState<IMedia[] | null>(null);

  const mediaQuery = api;
  return <></>;
}
