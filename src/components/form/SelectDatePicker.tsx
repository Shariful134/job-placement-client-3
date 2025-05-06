import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SelectDatePicker = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (date: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-[inter]",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-1 border-gray-400"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            if (date) {
              onSelect(date.toISOString());
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default SelectDatePicker;
