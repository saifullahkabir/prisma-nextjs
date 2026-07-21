"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { SpinnerButton } from "@/components/common/SpinnerButton";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, false);

  // const router = useRouter();

  useEffect(() => {
    if (!state) return;

    // if (state.success) {
    //   toast.success(state.message || "Login successfully");
    //* client side navigation
    //   router.push("/dashboard");
    // }

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" required />
        </div>
        <div className="flex flex-col gap-4 pb-6">
          {pending ? (
            <SpinnerButton value="Logging in..." />
          ) : (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}
          <Button variant="outline" className="w-full ">
            Login with Google
          </Button>
        </div>
      </div>
    </form>
  );
}
