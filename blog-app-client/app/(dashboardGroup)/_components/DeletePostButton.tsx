"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deletePost } from "../_actions/myPostsActions";

export function DeletePostButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePost(postId);

      if (result.success) {
        toast.success(result.message || "Post deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete post");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 className="size-4" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
