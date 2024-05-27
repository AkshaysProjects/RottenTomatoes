import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, InputProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "m-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";

export default Grid;
