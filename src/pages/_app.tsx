import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import { NextPage } from "next";

// 기존에 Next.js에서 제공하는 페이지 컴포넌트 타입에다가 getLayout이라는 새로운 타입을 추가한것
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

// 글로벌 레이아웃을 작성할때는 root디렉토리의 _app.tsx에 작성한다.
// 글로벌 레이아웃도 길어지면 가독성이 떨어지기 때문에 따로 컴포넌트로 분리시킴

export default function App({
  Component,
  pageProps,
}: AppProps & {
  // App 컴포넌트가 전달받는 props의 타입을 확장한 것
  Component: NextPageWithLayout;
}) {
  // 넘어온 Component 에서 getLayout 이라는 메서드가 있으면 그걸 사용하고
  // 없으면 그냥 페이지를 리턴하는 단축 평가를 사용함
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
