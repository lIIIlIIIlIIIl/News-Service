/* eslint-disable prefer-const */
import axios from "axios";
import { HeadlineData, UserSelectData } from "../types/Headline";

interface ParamsTpye {
  [key: string]: string | undefined;
  countries?: string | undefined;
  topic?: string | undefined;
}

interface HEADER_API_KEY {
  "x-api-key": string;
}

export class HeadlineHandler {
  private "API_KEY": string;
  private "HEADER_API_KEY": HEADER_API_KEY;
  private BASE_URL =
    "https://api.newscatcherapi.com/v2/latest_headlines?when=14d&page_size=30";

  params: ParamsTpye | null = null;
  data: HeadlineData[] = [];
  page = 1;
  totalPage = 1;

  constructor() {
    this["API_KEY"] = import.meta.env.VITE_APP_API_KEY;
    this["HEADER_API_KEY"] = { "x-api-key": this["API_KEY"] };
  }

  async getData() {
    const url = `${this.BASE_URL}&page=${this.page}`;
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
          const newData: HeadlineData[] = articles.reduce(
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
          this.setData(newData);
          this.setTotalPage(total_pages);
          this.setPage(this.page + 1);
        });
    } catch (error) {
      console.log(error);
    }
  }

  makeParam(selectData: UserSelectData) {
    const params: ParamsTpye = {};
    for (let key in selectData) {
      if (selectData[key] !== undefined) {
        params[key] = selectData[key];
      }
    }
    this.setParams(params);
  }

  setParams(params: ParamsTpye) {
    this.params = params;
  }
  setPage(nextPage: number) {
    this.page = nextPage;
  }
  setData(articles: HeadlineData[]) {
    this.data = [...this.data, ...articles];
  }
  setTotalPage(totalPage: number) {
    this.totalPage = totalPage;
  }
}
