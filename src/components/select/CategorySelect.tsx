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
  setCategoriesSelect: (categories: string[]) => void;
  categories: string[];
}
const CategorySelect: React.FC<SelectedProps> = ({
  setCategoriesSelect,
  categories,
}) => {
  const handleSelect = (value: string) => {
    if (value === "All Category") {
      setCategoriesSelect([]);
    } else {
      setCategoriesSelect([value]);
    }
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-75 border-gray-500">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="border border-black/30 rounded-lg">
        <SelectGroup>
          <SelectItem key="All Category" value="All Category">
            All Category
          </SelectItem>
          {categories.map((category: string) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
