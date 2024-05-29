interface Filter {
  slug: string;
  name: string;
  type: "slider" | "checkbox-group";
  minValue?: number;
  maxValue?: number;
  values?: string[];
}

export const filters: Filter[] = [
  {
    slug: "rating",
    name: "Rating",
    type: "slider",
    minValue: 0,
    maxValue: 100,
  },
  {
    slug: "releaseYear",
    name: "Release",
    type: "slider",
  },
  {
    slug: "languages",
    name: "Language",
    type: "checkbox-group",
  },
  {
    slug: "genres",
    name: "Genre",
    type: "checkbox-group",
  },
  {
    slug: "status",
    name: "Status",
    type: "checkbox-group",
  },
];
