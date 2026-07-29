"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeletePostButton({
  postId,
}: {
  postId: string;
}) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        console.log(postId);
      }}
    >
      <Trash2 className="size-4" />
      Delete
    </Button>
  );
}