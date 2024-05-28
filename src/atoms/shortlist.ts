import { atom } from "jotai";

interface IShortlistAtom {
  data: string[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}
const initialData: IShortlistAtom = {
  data: [],
  status: "idle",
  error: null,
};

export const shortlistAtom = atom(initialData);
