import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type DProp<T extends string | number> = {
  label: string;
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
};

const DropdownMenuWithIcon = <T extends string | number>({
  label,
  options,
  selected,
  onSelect,
}: DProp<T>) => {
  return (
    <div className="flex gap-2 items-center">
      <span>{label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-10 items-center border rounded-xl p-1 px-2">
          {selected} <GoTriangleDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((value, index) => (
            <DropdownMenuItem key={index} onSelect={() => onSelect(value)}>
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuWithIcon;
