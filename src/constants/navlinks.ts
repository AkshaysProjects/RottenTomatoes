interface NavLink {
  url: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { url: "/movies", label: "Movies" },
  { url: "/shows", label: "TV Shows" },
  { url: "/shortlist", label: "Shortlist" },
];
