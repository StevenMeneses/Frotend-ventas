import { Input, InputProps } from "@heroui/input";
import { Select, SelectProps } from "@heroui/react";
import { ReactNode } from "react";

type InputCustomProps = InputProps;
type SelectCustomProps = SelectProps & { children: ReactNode };

export default function InputCustom({
  variant = "bordered",
  labelPlacement = "outside-top",
  ...props
}: InputCustomProps) {
  return <Input variant={variant} labelPlacement={labelPlacement} {...props} />;
}

export function SelectCustom({
  variant = "bordered",
  labelPlacement = "outside-top",
  children,
  ...props
}: SelectCustomProps) {
  return (
    <Select variant={variant} labelPlacement={labelPlacement} {...props}>
      {children}
    </Select>
  );
}