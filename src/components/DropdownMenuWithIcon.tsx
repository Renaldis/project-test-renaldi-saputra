import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <span>{label}</span>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="flex gap-10 items-center border rounded-xl p-1 px-2">
          {selected} {isOpen ? <GoTriangleUp /> : <GoTriangleDown />}
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
