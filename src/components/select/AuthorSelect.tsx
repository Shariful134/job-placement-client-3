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
  setAuthorSelect: (authors: string[]) => void;
  authors: string[];
}
const Authorselect: React.FC<SelectedProps> = ({
  setAuthorSelect,
  authors,
}) => {
  const handleSelect = (value: string) => {
    if (value === "All Authors") {
      setAuthorSelect([]);
    } else {
      setAuthorSelect([value]);
    }
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-full border-gray-500 dark:text-gray-300">
        <SelectValue placeholder="Select a Authors" />
      </SelectTrigger>
      <SelectContent className="dark:text-gray-300 dark:bg-gray-900">
        <SelectGroup>
          <SelectItem
            className="dark:text-gray-300"
            key="All Authors"
            value="All Authors"
          >
            All Authors
          </SelectItem>
          {authors.map((author: string) => (
            <SelectItem
              className="dark:text-gray-300"
              key={author}
              value={author}
            >
              {author}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Authorselect;
