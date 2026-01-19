import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  return (
    <div className="max-w-md">
      <h1 className="mb-3 text-2xl font-bold">Complete Profile</h1>
      <p className="mb-2">
        Before accessing the dashboard, please complete your profile
        information.
      </p>

      <form className="mb-2 flex gap-2">
        <Input type="text" placeholder="Full name" disabled className="flex-1" />
        <Button type="submit" disabled>
          Submit
        </Button>
      </form>
    </div>
  );
}
