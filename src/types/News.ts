export interface NewsData {
  title: string;
  author: string;
  published_date: string;
  summary: string;
  rights: string;
  media: string;
  rank: number;
  link: string;
}

export interface UserSearchParams {
  [key: string]: string | undefined;

  q: string | undefined;
  search_in: string | undefined;
  countries: string | undefined;
  topic: string | undefined;
  sort_by: string | undefined;
}
