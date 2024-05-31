import { MailCheck } from "lucide-react";

export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <MailCheck className="mx-auto mb-4 flex h-16 w-16 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold text-red-500">
          Check Your Email
        </h1>
        <p className="mb-4 text-gray-600">
          We&apos;ve sent a Magic link to your email address. Please check your
          inbox and click the link to sign in.
        </p>
      </div>
    </div>
  );
}
