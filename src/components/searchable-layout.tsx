import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import styles from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const q = router.query.q;

  useEffect(() => {
    // 쿼리스트링의 타입은 문자열 배열, undefined 또는 문자열 중 하나이므로
    // 아래의 경우 타입 단언이 필요함
    setSearch((q as string) || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={styles.search_container}>
        <input
          type="text"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
