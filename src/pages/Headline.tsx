/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASIC_URL, requestOptions } from "../api/const";
import { countryOptions, topicOptions } from "../assets/OptionData";
import SelectBox from "../components/SelectBox";
import HeadlineCard from "../components/Card/HeadlineCard";
import { HeadlineData, UserSelectData } from "../types/Headline";

const fetchData = (URL: string) => {
  const response = fetch(URL, requestOptions).then((res) => res.json());
  return response;
};

const HEADLINE_URL = `${BASIC_URL}?when=14d&page_size=30`;

const Headline = () => {
  const [headlineData, setHeadlineData] = useState<HeadlineData[]>([]);
  const [url, setUrl] = useState<string>(HEADLINE_URL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastArticle, setLastArticle] = useState<HTMLLIElement | null>(null);
  const [page, setPage] = useState<number>(1);

  const headlineSelectHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPage(1);

    //? 셀렉터에서 데이더 받아오기
    const formData = new FormData(event.currentTarget);
    const userSelectData: UserSelectData = {
      countries: (formData.get("country") as string) || "none",
      topic: (formData.get("topic") as string) || "none",
    };

    //? 받아온 데이어를 가지고 URL 작성
    let searchUrl = HEADLINE_URL;

    for (const key in userSelectData) {
      if (userSelectData[key] !== "none") {
        searchUrl = searchUrl + `&${key}=${userSelectData[key]}`;
      }
    }

    //? 데이터 요청하기
    const response = await fetchData(`${searchUrl}&page=1`);

    if (response.status === "ok") {
      const newData: HeadlineData[] = response.articles.reduce(
        (prev: HeadlineData[], article: HeadlineData) => {
          return [
            ...prev,
            {
              title: article.title,
              author: article.author,
              published_date: article.published_date,
              rights: article.rights,
              media: article.media,
              link: article.link,
            },
          ];
        },
        [] as HeadlineData[]
      );
      setHeadlineData(newData);
      setUrl(searchUrl);
      setIsLoading(true);
    }
  };

  const scrollfetchHandler = async () => {
    const URL = url + `&page=${page}`;

    const response = await fetchData(URL);

    if (response.status === "ok") {
      const newData: HeadlineData[] = response.articles.reduce(
        (prev: HeadlineData[], article: HeadlineData) => {
          return [
            ...prev,
            {
              title: article.title,
              author: article.author,
              published_date: article.published_date,
              rights: article.rights,
              media: article.media,
              link: article.link,
            },
          ];
        },
        [] as HeadlineData[]
      );
      setHeadlineData((prev) => prev.concat(newData));
    }
  };
  ///
  ///

  const listObserver: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
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
