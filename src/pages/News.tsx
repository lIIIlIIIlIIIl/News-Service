import { useState } from "react";
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

const News = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [searchUrl, setSearchUrl] = useState<string>(NEWS_URL);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

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
      setSearchUrl(mySearchUrl);
    }
  };

  return (
    <section>
      <div className="headline-search">
        <h1>원하는 뉴스를 검색하세요.</h1>
        <form onSubmit={newsSearchHandler}>
          <div>
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
    </section>
  );
};

export default News;
