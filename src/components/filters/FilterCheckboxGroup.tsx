"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export interface IFilterCheckboxGroupProps {
  filter: string;
  values: string[];
}

export default function FilterCheckboxGroup({
  filter,
  values,
}: IFilterCheckboxGroupProps) {
  // Retrieve search params, router, and pathname
  const searchParams = useSearchParams();
  const selectedValues = searchParams.get(filter)?.split(",") || [];
  const router = useRouter();
  const pathname = usePathname();

  // Handle checkbox change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Toggle selected values
    if (selectedValues.includes(e.target.value)) {
      selectedValues.splice(selectedValues.indexOf(e.target.value), 1);
    } else {
      selectedValues.push(e.target.value);
    }
    // Construct updated search params
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set(filter, selectedValues.join(","));
    // Replace current URL with updated search params
    router.replace(
      pathname + (queryParams.toString() ? `?${queryParams}` : ""),
    );
  };

  return (
    <div className="h-1/2 flex-col">
      {/* Map through values and render checkbox */}
      {values.map((value) => (
        <div
          key={value.toLowerCase()}
          className="my-2 flex items-center space-x-2"
        >
          <input
            type="checkbox"
            id={value.toLowerCase()}
            value={value}
            className="h-4 w-4"
            checked={selectedValues?.includes(value)}
            onChange={handleChange}
          />
          <label
            htmlFor={value.toLowerCase()}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {value}
          </label>
        </div>
      ))}
    </div>
  );
}
