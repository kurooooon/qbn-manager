import { SearchInput as SearchInputComponent } from "@/components/ui/search-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  searchText: z.string(),
});

type SearchFormData = z.infer<typeof searchSchema>;

type Props = {
  onSearch: (value: string) => void;
};

export const SearchInput = ({ onSearch }: Props) => {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchText: "",
    },
  });
  const { handleSubmit, setValue } = form;

  // テキストを正規化する関数
  const normalizeText = useCallback((text: string): string => {
    if (!text) {
      return "";
    }
    const trimmed = text.trim();
    return trimmed.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  }, []);

  const onSubmit = (data: SearchFormData) => {
    // 入力値を正規化する
    const normalized = normalizeText(data.searchText);
    setValue("searchText", normalized);
    onSearch(normalized);
  };

  return (
    <form className="w-[336px]" onSubmit={handleSubmit(onSubmit)} noValidate>
      <SearchInputComponent
        placeholder="名前、ログインIDで検索"
        {...form.register("searchText")}
      />
    </form>
  );
};
