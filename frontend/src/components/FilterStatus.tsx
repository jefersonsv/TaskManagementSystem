import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TParamHandlerVoid } from "@/types/TParamHandlerVoid";
import { Label } from "@radix-ui/react-label";

export default function FilterStatus({
  onChange,
}: {
  onChange: TParamHandlerVoid<string>;
}) {
  return (
    <div className="w-1/2 flex items-center space-x-4">
      <div className="font-semibold">Status: </div>
      <RadioGroup
        defaultValue=""
        className="flex flex-col sm:flex-row flex-wrap sm:space-x-2"
        onValueChange={onChange}
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="" id="r1" />
          <Label htmlFor="r1" className="cursor-pointer">
            Any Status
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="Pending" id="r2" />
          <Label htmlFor="r2" className="cursor-pointer">
            Pending
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="In Progress" id="r3" />
          <Label htmlFor="r3" className="cursor-pointer">
            In Progress
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="Completed" id="r4" />
          <Label htmlFor="r4" className="cursor-pointer">
            Completed
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="Archived" id="r5" />
          <Label htmlFor="r5" className="cursor-pointer">
            Archived
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
