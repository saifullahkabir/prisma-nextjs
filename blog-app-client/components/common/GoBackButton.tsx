"use client";

import { Button } from "@/components/ui/button";

export default function GoBackButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-48"
      onClick={() => window.history.back()}
    >
      Go Back
    </Button>
  );
}
