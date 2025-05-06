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
  setInStockSelect: (value: "all" | "inStock" | "outOfStock") => void;
}
const InStockSelect: React.FC<SelectedProps> = ({ setInStockSelect }) => {
  return (
    <Select
      onValueChange={(value) =>
        setInStockSelect(value as "all" | "inStock" | "outOfStock")
      }
    >
      <SelectTrigger className="w-75 border-gray-500">
        <SelectValue placeholder="Select Stock" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key="all" value="all">
            All Books
          </SelectItem>
          <SelectItem key="inStock" value="inStock">
            InStock
          </SelectItem>
          <SelectItem key="outOfStock" value="outOfStock">
            outOfStock
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default InStockSelect;
