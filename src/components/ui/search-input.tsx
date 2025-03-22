import { Input } from "@/components/ui/input";
import { Icon } from "./icon";

interface Props {
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput({
  placeholder = "名前、ログインIDで検索",
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        className="pr-9"
        onChange={onChange}
      />
      <span className="inline-flex absolute right-2 top-1/2 transform -translate-y-1/2">
        <Icon name="loupe" className="w-6" />
      </span>
    </div>
  );
}
