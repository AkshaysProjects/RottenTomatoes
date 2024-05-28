import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/server";
import { ChevronDownIcon } from "lucide-react";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import FilterSlider from "./FilterSlider";

export default async function Filters() {
  // Fetch available filters from the API
  const filters = await api.media.getMediaFilters();

  return (
    <div className="mx-auto flex h-16 items-center justify-center gap-2 border-b-2">
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2">
            <p>Rating</p>
            <ChevronDownIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex gap-2">
          <FilterSlider filter="rating" minValue={0} maxValue={100} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2">
            <p>Release</p>
            <ChevronDownIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex gap-2">
          <FilterSlider
            filter="releaseYear"
            minValue={filters.releaseYear[0]}
            maxValue={filters.releaseYear[1]}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2">
            <p>Languages</p>
            <ChevronDownIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex max-h-96 gap-2 overflow-auto">
          <FilterCheckboxGroup filter="languages" values={filters.languages} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2">
            <p>Genres</p>
            <ChevronDownIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex max-h-96 gap-2 overflow-auto">
          <FilterCheckboxGroup filter="genres" values={filters.genres} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2">
            <p>Status</p>
            <ChevronDownIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex max-h-96 gap-2 overflow-auto">
          <FilterCheckboxGroup filter="status" values={filters.status} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
