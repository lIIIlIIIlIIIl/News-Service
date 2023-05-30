/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import {
  countryOptions,
  searchinOptions,
  sortOptions,
  topicOptions,
} from "../assets/OptionData";
import SelectBox from "../components/SelectBox";
import { NewsData } from "../types/News";
import { NEWS_URL, fetchData } from "../api/const";
import { UserSelectData } from "../types/Headline";
import NewsCard from "../components/Card/NewsCard";
import Pagination from "../components/Pagination";

const News = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [searchUrl, setSearchUrl] = useState<string>(NEWS_URL);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    if (newsData.length === 0 || totalPage < 1) setIsSearch(false);
    if (newsData.length !== 0 || totalPage > 1) setIsSearch(true);
  }, []);

  const newsSearchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);

    const formData = new FormData(event.currentTarget);
    const userSearchData: UserSelectData = {
      q: (formData.get("keyword") as string) || "none",
      search_in: (formData.get("search") as string) || "none",
      countries: (formData.get("country") as string) || "none",
      topic: (formData.get("topic") as string) || "none",
      sort_by: (formData.get("sort") as string) || "none",
    };

    let mySearchUrl = searchUrl;
    for (const key in userSearchData) {
      if (userSearchData[key] !== "none") {
        if (key === "q") {
          mySearchUrl += `&${key}="${userSearchData[key]}"`;
        } else {
          mySearchUrl += `&${key}=${userSearchData[key]}`;
        }
      }
    }

    const response = await fetchData(mySearchUrl);

    if (response.status === "ok") {
      const total = response.total_pages;

      const newData: NewsData[] = response.articles.reduce(
        (prev: NewsData[], article: NewsData) => {
          return [
            ...prev,
            {
              title: article.title,
              author: article.author,
              summary: article.summary,
              published_date: article.published_date,
              rights: article.rights,
              media: article.media,
              rank: article.rank,
              link: article.link,
            },
          ];
        },
        [] as NewsData[]
      );

      setNewsData(newData);
      setTotalPage(total);
      setSearchUrl(mySearchUrl);
      setIsSearch(true);
    }
  };

  const fetchDateUsePageNumber = async (searchPage: number) => {
    const mySearchUrl = `${searchUrl}&page=${searchPage}`;
    const response = await fetchData(mySearchUrl);

    if (response.status === "ok") {
      const newData: NewsData[] = response.articles.reduce(
        (prev: NewsData[], article: NewsData) => {
          return [
            ...prev,
            {
              title: article.title,
              author: article.author,
              summary: article.summary,
              published_date: article.published_date,
              rights: article.rights,
              media: article.media,
              rank: article.rank,
              link: article.link,
            },
          ];
        },
        [] as NewsData[]
      );

      setNewsData(newData);
      setIsSearch(true);
    }
  };

  const onNextPage = useCallback(() => {
    if (page + 1 <= totalPage) {
      setPage((prev) => prev + 1);
      fetchDateUsePageNumber(page + 1);
    }
  }, [page, totalPage]);

  const onBackPage = useCallback(() => {
    if (page - 1 > 0) {
      setPage((prev) => prev - 1);
      fetchDateUsePageNumber(page - 1);
    }
  }, [page]);

  const onPageNumberClickHandler = useCallback((page: number) => {
    setPage(page);
    fetchDateUsePageNumber(page);
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
