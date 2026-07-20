import LoginForm from "../_components/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="px-4 md:px-0 my-auto">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="md:px-6 md:py-4 py-3">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/register"}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="md:px-6">
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
