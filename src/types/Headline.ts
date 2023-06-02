export interface HeadlineData {
  title: string;
  author: string;
  published_date: string;
  rights: string;
  media: string;
  link: string;
}

export interface UserSelectData {
  [key: string]: string | undefined;
  countries: string | undefined;
  topic: string | undefined;
}
