"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import FilterSlider from "./FilterSlider";

export interface IFilterPopoverProps {
  type: "slider" | "checkbox-group";
  filter: string;
  filterSlug: string;
  minValue?: number;
  maxValue?: number;
  values?: string[];
}

export default function FilterPopover({
  type,
  filter,
  filterSlug,
  minValue,
  maxValue,
  values,
}: IFilterPopoverProps) {
  const rawFilterValues = useSearchParams().get(filterSlug);
  const filterValues =
    type === "slider"
      ? rawFilterValues?.split(",").map((n) => parseInt(n))
      : rawFilterValues?.split(",");
  const filtersExist =
    type === "slider"
      ? filterValues &&
        (filterValues[0] !== minValue || filterValues[1] !== maxValue)
      : filterValues && filterValues.length > 0;

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={`flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2 ${filtersExist ? "border-gray-400 bg-slate-200" : ""}`}
        >
          <p className="items-center">{filter}</p>
          {filtersExist && type !== "slider" && (
            <span className="rounded-md bg-slate-400 px-2 py-1 text-xs">
              {filterValues?.length}
            </span>
          )}
          <ChevronDownIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="relative z-40 flex max-h-96 gap-2 overflow-auto">
        {type === "slider" && (
          <FilterSlider
            filter={filterSlug}
            minValue={minValue!}
            maxValue={maxValue!}
          />
        )}
        {type === "checkbox-group" && (
          <FilterCheckboxGroup filter={filterSlug} values={values!} />
        )}
      </PopoverContent>
    </Popover>
  );
}
