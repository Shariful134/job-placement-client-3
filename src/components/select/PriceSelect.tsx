import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface SelectedProps {
  setPricesSelect: (prices: [number, number] | null) => void;
}
const PriceSelect: React.FC<SelectedProps> = ({ setPricesSelect }) => {
  const priceRanges = [
    { label: "All Price", value: null },
    { label: "(0-20) $", value: [0, 20] },
    { label: "(21-40) $", value: [21, 40] },
    { label: "(41-60) $", value: [41, 60] },
    { label: "(61-80) $", value: [61, 80] },
    { label: "(81-100) $", value: [81, 100] },
  ];
  const handleSelect = (value: string) => {
    const selectedRange = priceRanges.find((range) => range.label === value);

    return setPricesSelect((selectedRange?.value as [number, number]) || null);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-75 border-gray-500">
        <SelectValue placeholder="Select Price Range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key="All Price" value="All Price">
            Price
          </SelectItem>
          {priceRanges.map((range) => (
            <SelectItem key={range.label} value={range.label}>
              {range.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PriceSelect;
