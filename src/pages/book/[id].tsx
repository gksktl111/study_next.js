import { useRouter } from "next/router";
import styles from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";

const mockData = {
  id: 1,
  title: "한 입 크기로 잘라 먹는 리액트",
  subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
  description:
    "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
  author: "이정환",
  publisher: "프로그래밍인사이트",
  coverImgUrl:
    "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // url Parameter 값을 갖는 파일로 인식함
  // 쿼리스트링과 똑같은 방식으로 url쿼리에 저장됨
  // const router = useRouter();

  // 매칭되는 키값은 파일명에 있는 대괄호 안에 있는 값

  // 만약 대괄호 내부의 값 앞에 ... 을 붙이면 catch All Segment 로 인식되어

  // 경로상의 모든 경로를 인식함 ( / 를 포함한 모든 경로를 인식함)
  // 이때 가져오는 쿼리 값은 배열 형태로 저장됨 ( / 로 구분되어 저장됨)
  // 그러나 root로 (여기선 book/ ) 요청하는경우 404에러가 나옴

  // 완전 범용적인 페이지로 만들고 싶을경우 [[...id]] 이렇게 사용
  // 이러면 모든 경우에 대해서 캐치함 (경로뒤에 값이 들어오든 안들어오든 캐치)
  // optional catch all segments 라고 부름

  // const { id } = router.query;

  if (!book) return "문제가 발생했습니다 다시 시도해주세요!";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.author}>
        {author} | {publisher}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
