/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import {
  countryOptions,
  searchinOptions,
  sortOptions,
  topicOptions,
} from "../assets/OptionData";
import SelectBox from "../components/SelectBox";
import { NewsData, UserSearchParams } from "../types/News";
import NewsCard from "../components/Card/NewsCard";
import Pagination from "../components/Pagination";
import { NewsHandler } from "../api/NewsApi";

const News = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const newsHandler = new NewsHandler();

  useEffect(() => {
    if (newsData.length === 0 || totalPage < 1) setIsSearch(false);
    if (newsData.length !== 0 || totalPage > 1) setIsSearch(true);
  }, [newsData]);

  const newsSearchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);

    const formData = new FormData(event.currentTarget);
    const userSearchData: UserSearchParams = {
      q:
        formData.get("keyword") === "none"
          ? undefined
          : (formData.get("keyword") as string),
      search_in:
        formData.get("search") === "none"
          ? undefined
          : (formData.get("search") as string),
      countries:
        formData.get("country") === "none"
          ? undefined
          : (formData.get("country") as string),
      topic:
        formData.get("topic") === "none"
          ? undefined
          : (formData.get("topic") as string),
      sort_by:
        formData.get("sort") === "none"
          ? undefined
          : (formData.get("sort") as string),
    };

    newsHandler.makeParam(userSearchData);

    await newsHandler.getData(page);
    setNewsData(newsHandler.data);
    setTotalPage(newsHandler.totalPage);
    setIsSearch(true);
  };

  const onNextPage = useCallback(async () => {
    if (page + 1 <= totalPage) {
      setPage((prev) => prev + 1);
      await newsHandler.getData(page + 1);
      setNewsData(newsHandler.data);
    }
  }, [page, totalPage]);

  const onBackPage = useCallback(async () => {
    if (page - 1 > 0) {
      setPage((prev) => prev - 1);
      await newsHandler.getData(page - 1);
      setNewsData(newsHandler.data);
    }
  }, [page]);

  const onPageNumberClickHandler = useCallback(async (page: number) => {
    setPage(page);
    await newsHandler.getData(page);
    setNewsData(newsHandler.data);
  }, []);

  return (
    <section>
      <div className="headline-search">
        <h1>원하는 뉴스를 검색하세요.</h1>
        <form onSubmit={newsSearchHandler}>
          <div className="news-input">
            <input
              type="text"
              placeholder="키워드를 입력해주세요."
              name="keyword"
            />
          </div>
          <SelectBox name="search" options={searchinOptions} />
          <SelectBox name="country" options={countryOptions} />
          <SelectBox name="topic" options={topicOptions} />
          <SelectBox name="sort" options={sortOptions} />
          <button>검색하기</button>
        </form>
      </div>
      {newsData.length === 0 ? null : (
        <div>
          <ul className="news">
            {newsData.map((news, index) => {
              return (
                <li key={index} className="news-item">
                  <NewsCard article={news} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isSearch && (
        <div className="news-pagenation">
          <Pagination
            totalPage={totalPage}
            pageNumber={page}
            onBackPage={onBackPage}
            onNextPage={onNextPage}
            onPageNumberClickHandler={onPageNumberClickHandler}
          />
        </div>
      )}
    </section>
  );
};

export default News;
