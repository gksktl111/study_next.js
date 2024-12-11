import { ReactNode, useEffect } from "react";
import styles from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
// @ 경로는 프로젝트 루트 경로를 의미함
import BookItem from "@/components/book-itme";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // Promise.all 를 사용하여 함수를 병렬구조로 실행함
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: { allBooks, recoBooks },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 자동으로 props 타입을 추론해줌

  // 클라이언트에서만 실행되는 코드
  useEffect(() => {
    console.log("클라이언트 프롭스에요");
  }, []);

  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          // {/*
          //   {...book}는 객체 스프레드 연산자를 사용하여 book 객체의 모든 속성을
          //   BookItem 컴포넌트의 props로 전달합니다.

          //   예를 들어 book = { id: 1, title: "제목", author: "저자" } 일 때
          //   아래 두 방식은 동일합니다:

          //   <BookItem key={book.id} {...book} />
          //   <BookItem key={book.id} id={book.id} title={book.title} author={book.author} />
          // */}
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// getLayout 이라는 메서드는 페이지 라는 매개변수로 현져의 페이지 역할을 할
// 매개변수를 받아와서 SearchableLayout라는 별도의 레이아웃으로
// 감싼 페이지를 리턴해주는 메서드가됨

// (Home 함수에 메서드를 추가한것, 자바스크립트의 함수는 모두 객체이므로 가능함)
Home.getLayout = function getLayout(page: ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};
