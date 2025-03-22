import { SearchInput } from "@/components/ui/search-input";
import { normalizeAlphaNumericText } from "@/utils/stringUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  searchText: z.string(),
});

type SearchFormData = z.infer<typeof searchSchema>;

type Props = {
  onSearch: (value: string) => void;
};

export const SearchForm = ({ onSearch }: Props) => {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchText: "",
    },
  });
  const { handleSubmit, setValue } = form;

  const onSubmit = (data: SearchFormData) => {
    // 入力値を正規化する
    const normalized = normalizeAlphaNumericText(data.searchText);
    setValue("searchText", normalized);
    onSearch(normalized);
  };

  return (
    <form className="w-[336px]" onSubmit={handleSubmit(onSubmit)} noValidate>
      <SearchInput
        placeholder="名前、ログインIDで検索"
        {...form.register("searchText")}
      />
    </form>
  );
};
