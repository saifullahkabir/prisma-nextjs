import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function HomePage() {
  const user = await getMe();
  console.log("user", user);
  return (
    <Container>
      <div>
        Home page
        <Button>Click me</Button>
      </div>
    </Container>
  );
}
