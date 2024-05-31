"use client";

import { loginWithGoogle, loginWithResend } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function DialogDemo() {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <h2 className="mx-auto mb-2 inline text-3xl font-bold text-red-600">
            Sign in or Register
          </h2>
        </DialogHeader>
        <div className="mx-auto mb-2 w-12 border-2 border-red-600"></div>
        <form action={loginWithGoogle}>
          <Button
            type="submit"
            className="mx-auto my-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white p-2 text-black shadow-lg hover:bg-slate-200"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </Button>
        </form>
        <p className="mx-auto mb-2 text-gray-500">or use your email account</p>
        <form action={loginWithResend} className="flex flex-col items-center">
          <Input
            name="email"
            type="email"
            placeholder="email@example.com"
            autoFocus
            className="mb-2 border-2 border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            className="rounded-full border-2 bg-red-600 px-12 py-2 font-semibold text-white"
          >
            Sign in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
