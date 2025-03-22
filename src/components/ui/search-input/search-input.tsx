import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { ComponentProps, forwardRef } from "react";

type Props = ComponentProps<typeof Input>;

export const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className="relative">
      <Input type="text" className="pr-9" ref={ref} {...props} />
      <span className="inline-flex absolute right-2 top-1/2 transform -translate-y-1/2">
        <Icon name="loupe" className="w-6" />
      </span>
    </div>
  );
});
