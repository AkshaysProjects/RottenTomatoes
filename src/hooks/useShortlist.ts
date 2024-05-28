import { shortlistAtom } from "@/atoms/shortlist";
import { useAtomValue, useSetAtom } from "jotai";

// Hook to get the current value of the shortlist atom
export default function useShortlist() {
  return useAtomValue(shortlistAtom);
}

// Hook to get the setter function for the shortlist atom
export function useSetShortlist() {
  return useSetAtom(shortlistAtom);
}
