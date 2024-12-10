import { useRouter } from "next/router";
export default function Page() {
  // url Parameter 값을 갖는 파일로 인식함
  // 쿼리스트링과 똑같은 방식으로 url쿼리에 저장됨
  const router = useRouter();

  // 매칭되는 키값은 파일명에 있는 대괄호 안에 있는 값

  // 만약 대괄호 내부의 값 앞에 ... 을 붙이면 catch All Segment 로 인식되어

  // 경로상의 모든 경로를 인식함 ( / 를 포함한 모든 경로를 인식함)
  // 이때 가져오는 쿼리 값은 배열 형태로 저장됨 ( / 로 구분되어 저장됨)
  // 그러나 root로 (여기선 book/ ) 요청하는경우 404에러가 나옴

  // 완전 범용적인 페이지로 만들고 싶을경우 [[...id]] 이렇게 사용
  // 이러면 모든 경우에 대해서 캐치함 (경로뒤에 값이 들어오든 안들어오든 캐치)
  // optional catch all segments 라고 부름

  const { id } = router.query;
  return <h1>book {id}</h1>;
}
