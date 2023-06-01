/* eslint-disable prefer-const */
import axios from "axios";
import { NewsData, UserSearchParams } from "../types/News";

interface ParamsTpye {
  [key: string]: string | undefined;

  q?: string | undefined;
  search_in?: string | undefined;
  countries?: string | undefined;
  topic?: string | undefined;
  sort_by?: string | undefined;
}

interface HEADER_API_KEY {
  "x-api-key": string;
}

export class NewsHandler {
  private "API_KEY": string;
  private "HEADER_API_KEY": HEADER_API_KEY;
  private BASE_URL = "https://api.newscatcherapi.com/v2/search?page_size=30";
  params: ParamsTpye | null = null;
  data: NewsData[] = [];
  totalPage = 1;

  constructor() {
    this["API_KEY"] = import.meta.env.VITE_APP_API_KEY;
    this["HEADER_API_KEY"] = { "x-api-key": this["API_KEY"] };
  }

  async getData(page: number) {
    const url = `${this.BASE_URL}&page=${page}`;
    try {
      await axios
        .get(url, {
          headers: {
            ...this["HEADER_API_KEY"],
          },
          params: this.params,
        })
        .then((res) => {
          const { articles, total_pages } = res.data;
          const newData: NewsData[] = articles.reduce(
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
          this.setData(newData);
          this.setTotalPage(total_pages);
        });
    } catch (error) {
      console.log(error);
    }
  }

  makeParam(searchData: UserSearchParams) {
    const params: ParamsTpye = {};
    for (let key in searchData) {
      if (searchData[key] !== undefined) {
        params[key] = searchData[key];
      }
    }
    this.setParams(params);
  }

  setParams(params: ParamsTpye) {
    this.params = params;
  }

  setData(articles: NewsData[]) {
    this.data = [...this.data, ...articles];
  }
  setTotalPage(totalPage: number) {
    this.totalPage = totalPage;
  }
}
