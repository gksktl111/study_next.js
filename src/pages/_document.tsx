import { Html, Head, Main, NextScript } from "next/document";

// 모든 페이지에 적용되어야 하는걸 설정할때 여기서 설정
// 메타태그를 설정하거나, 폰트 불러오기, 캐릭터셋 설정, 구글 애널리틱스 같은 서드파티 라이브러리를 쓴다거나 할때 여기서 적용
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
