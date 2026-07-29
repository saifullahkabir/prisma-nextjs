"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";


export function NewsSearchBar() {

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
       
        placeholder="Search news..."
        className="pl-9"
      />
    </div>
  );
}
