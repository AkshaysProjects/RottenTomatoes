import { loginWithGoogle, loginWithResend } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  return (
    <div className="flex">
      <div className="flex h-full min-h-screen w-2/3 items-center bg-red-600 text-white">
        <div className="mx-auto my-auto items-center">
          <h2 className="mb-2 text-3xl font-bold">Hello, Friend!</h2>
          <div className="mb-2 inline-block w-10 border-2 border-white"></div>
          <p className="mb-2">
            Fill up personal information and start journey with us.
          </p>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center p-8">
        <h2 className="mb-2 inline text-3xl font-bold text-red-600">
          Sign in or Register
        </h2>
        <div className="mb-4 w-12 border-2 border-red-600"></div>
        <form action={loginWithGoogle}>
          <Button
            type="submit"
            className="mb-4 mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white p-2 text-black shadow-lg hover:bg-slate-200"
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
      </div>
    </div>
  );
}
