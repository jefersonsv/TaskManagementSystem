import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TParamHandlerVoid } from "@/types/TParamHandlerVoid";
import { Label } from "@radix-ui/react-label";

export default function FilterPriority({
  onChange,
}: {
  onChange: TParamHandlerVoid<string>;
}) {
  return (
    <div className="w-1/2 flex items-center space-x-4">
      <div className="font-semibold">Priority: </div>

      <RadioGroup
        defaultValue=""
        className="flex flex-col sm:flex-row flex-wrap sm:space-x-2"
        onValueChange={onChange}
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="" id="p1" />
          <Label htmlFor="p1" className="cursor-pointer">
            Any Priority
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="Low" id="p2" />
          <Label htmlFor="p2" className="cursor-pointer">
            Low
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="Medium" id="p3" />
          <Label htmlFor="p3" className="cursor-pointer">
            Medium
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="High" id="p4" />
          <Label htmlFor="p4" className="cursor-pointer">
            High
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
