/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { countryOptions, topicOptions } from "../assets/OptionData";
import SelectBox from "../components/SelectBox";
import HeadlineCard from "../components/Card/HeadlineCard";
import { HeadlineData, UserSelectData } from "../types/Headline";
import { HeadlineHandler } from "../api/HeadlineApi";

const Headline = () => {
  const [headlineData, setHeadlineData] = useState<HeadlineData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [lastArticle, setLastArticle] = useState<HTMLLIElement | null>(null);
  const [page, setPage] = useState<number>(1);

  const headlineHandler = new HeadlineHandler();

  const headlineSelectHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    //? 셀렉터에서 데이더 받아오기
    const formData = new FormData(event.currentTarget);
    const userSelectData: UserSelectData = {
      countries:
        formData.get("country") === "none"
          ? undefined
          : (formData.get("country") as string),
      topic:
        formData.get("topic") === "none"
          ? undefined
          : (formData.get("topic") as string),
    };

    //? 데이터 요청하기
    headlineHandler.makeParam(userSelectData);

    setIsLoading(true);
    await headlineHandler.getData();
    setHeadlineData(headlineHandler.data);
    setPage(headlineHandler.page);
    setIsLoading(false);
  };

  const scrollfetchHandler = async () => {
    setIsLoading(true);
    await headlineHandler.getData();
    setHeadlineData(headlineHandler.data);
    setIsLoading(false);
  };

  const listObserver: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    if (headlineData.length !== 0) {
      scrollfetchHandler();
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastArticle) {
      observer = new IntersectionObserver(listObserver, { threshold: 0.5 });

      observer.observe(lastArticle);
      return () => observer && observer.disconnect();
    }
  }, [lastArticle]);

  return (
    <section>
      <div className="headline-search">
        <h1>원하는 뉴스를 검색하세요.</h1>
        <form onSubmit={headlineSelectHandler}>
          <SelectBox name="country" options={countryOptions} />
          <SelectBox name="topic" options={topicOptions} />
          <button type="submit">검색하기</button>
        </form>
      </div>
      <ul className="headline">
        {headlineData.map((headline, index) => {
          return (
            <li
              key={index}
              data-index={index}
              className="headline-item"
              ref={setLastArticle}
            >
              <HeadlineCard article={headline} />
            </li>
          );
        })}
      </ul>
      {isLoading && <div>Loading.....</div>}
    </section>
  );
};

export default Headline;
