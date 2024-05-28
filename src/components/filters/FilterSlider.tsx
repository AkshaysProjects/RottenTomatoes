"use client";

import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export interface IFilterSliderProps {
  filter: string;
  minValue: number;
  maxValue: number;
}

// Component definition
export default function FilterSlider({
  filter,
  minValue,
  maxValue,
}: IFilterSliderProps) {
  // Hooks for router and search params
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // State to manage slider values
  const [values, setValues] = useState(
    searchParams
      .get(filter)
      ?.split(",")
      .map((n) => parseInt(n)) || [minValue, maxValue],
  );

  // Function to update URL with slider values
  const updateURLWithSliderValues = () => {
    const filterVal = `${values[0]},${values[1]}`;
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set(filter, filterVal);
    // Replace current URL with updated search params
    router.replace(
      pathname + (queryParams.toString() ? `?${queryParams}` : ""),
    );
  };

  return (
    <>
      <p>{minValue}</p>
      <Slider
        value={values}
        defaultValue={[minValue, maxValue]}
        minStepsBetweenThumbs={10}
        max={maxValue}
        min={minValue}
        step={1}
        onValueChange={(value) => setValues(value)}
        onValueCommit={updateURLWithSliderValues}
      />
      <p>{maxValue}</p>
    </>
  );
}
