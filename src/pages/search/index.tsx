import { useRouter } from "next/router";

export default function Page() {
  // 다양한 라우팅 기능 사용 가능
  const router = useRouter();
  const { q } = router.query;
  console.log(q);

  return <h1>검색 {q}</h1>;
}
