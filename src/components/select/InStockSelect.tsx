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
      <SelectTrigger className="w-full border-gray-500 dark:text-gray-300">
        <SelectValue placeholder="Select Stock" />
      </SelectTrigger>
      <SelectContent className="dark:bg-gray-900">
        <SelectGroup>
          <SelectItem className="dark:text-gray-300" key="all" value="all">
            All Books
          </SelectItem>
          <SelectItem
            className="dark:text-gray-300"
            key="inStock"
            value="inStock"
          >
            InStock
          </SelectItem>
          <SelectItem
            className="dark:text-gray-300"
            key="outOfStock"
            value="outOfStock"
          >
            outOfStock
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default InStockSelect;
