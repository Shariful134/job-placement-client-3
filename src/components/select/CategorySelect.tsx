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
      <SelectTrigger className="w-full border-gray-500 dark:text-gray-300">
        <SelectValue
          className="dark:text-gray-300"
          placeholder="Select a Category"
        />
      </SelectTrigger>
      <SelectContent className="border border-black/30 rounded-lg dark:text-gray-300 dark:bg-gray-900">
        <SelectGroup>
          <SelectItem
            className="dark:text-gray-300"
            key="All Category"
            value="All Category"
          >
            All Category
          </SelectItem>
          {categories.map((category: string, index: number) => (
            <SelectItem
              className="dark:text-gray-300"
              key={index}
              value={category}
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
