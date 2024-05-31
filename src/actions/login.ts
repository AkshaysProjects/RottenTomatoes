"use server";

import { signIn } from "@/auth";

export async function loginWithResend(formData: FormData) {
  console.log(formData);
  await signIn("resend", {
    email: formData.get("email"),
    redirectTo: "/dash",
  });
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dash", callbackUrl: "/" });
}
