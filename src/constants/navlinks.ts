interface NavLink {
  url: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { url: "/dash/movies", label: "Movies" },
  { url: "/dash/shows", label: "TV Shows" },
  { url: "/dash/shortlist", label: "Shortlist" },
];
