"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function SubscribeButton() {
  const [state, action, pending] = useActionState(() => {}, null);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Failed to start checkout");
    }
  }, [state]);

  return (
    <form action={action}>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Redirecting..." : "Subscribe Now"}
      </Button>
    </form>
  );
}
