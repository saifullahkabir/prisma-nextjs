import { Spinner } from "@/components/ui/spinner";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <Spinner className="size-10" />

        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your page.
          </p>
        </div>
      </div>
    </div>
  );
}