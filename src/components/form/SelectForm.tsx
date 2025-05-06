import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type categoryOption = {
  value: string;
  label: string;
};
type Props = {
  options: categoryOption[];
  placeholder: string;
  onChange: (value: string) => void;
};

const SelectForm = ({ options, placeholder, onChange }: Props) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full border-1 border-gray-400">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectForm;
