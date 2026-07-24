import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/common/GoBackButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <span className="inline-flex rounded-full border bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
          404 Error
        </span>

        <h1 className="mt-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent md:text-8xl">
          Oops!
        </h1>

        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Page Not Found
        </h2>

        <p className="mt-4 text-muted-foreground leading-7">
          Sorry, the page you are looking for doesn&apos;t exist, has been
          moved, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/">
            <Button size="lg" className="w-48">
              Go to Home
            </Button>
          </Link>

          <GoBackButton />
        </div>
      </div>
    </section>
  );
}
