import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TParamHandlerVoid } from "@/types/TParamHandlerVoid";
import { Label } from "@radix-ui/react-label";

export default function FilterPriority({
  onChange,
}: {
  onChange: TParamHandlerVoid<string>;
}) {
  return (
    <div className="w-1/2 flex items-center space-x-2">
      <div className="font-semibold">Priority: </div>
      <div className="flex flex-row">
        <RadioGroup
          defaultValue=""
          className="flex flex-row"
          onValueChange={onChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="p1" />
            <Label htmlFor="p1">Any Priority</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Low" id="p2" />
            <Label htmlFor="p2">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Medium" id="p3" />
            <Label htmlFor="p3">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="High" id="p4" />
            <Label htmlFor="p4">High</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
