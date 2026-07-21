import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SpinnerButtonProps = {
  value: string;
};

export function SpinnerButton({ value }: SpinnerButtonProps) {
  return (
    <Button disabled className="w-full">
      <Spinner data-icon="inline-start" />
      {value}
    </Button>
  );
}
