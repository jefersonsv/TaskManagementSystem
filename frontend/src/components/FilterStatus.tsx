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
      <div className="flex flex-row">
        <RadioGroup
          defaultValue=""
          className="flex flex-row"
          onValueChange={onChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="r1" />
            <Label htmlFor="r1">Any Status</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Pending" id="r2" />
            <Label htmlFor="r2">Pending</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="In Progress" id="r3" />
            <Label htmlFor="r3">In Progress</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Completed" id="r4" />
            <Label htmlFor="r4">Completed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Archived" id="r5" />
            <Label htmlFor="r5">Archived</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
