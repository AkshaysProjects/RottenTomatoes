"use client";

import { useEffect } from "react";

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: IErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h2 className="mb-4 text-4xl font-bold text-red-600">
        Something went wrong!
      </h2>
      <p className="mb-8 text-lg text-gray-700">
        We apologize for the inconvenience. Please try again or contact support
        if the problem persists.
      </p>
      <button
        className="rounded-xl bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
