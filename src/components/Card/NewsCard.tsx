import "./NewsCard.css";

import { NewsData } from "../../types/News";

interface NewsCardProps {
  article: NewsData;
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <a href={article.link} className="card-wrapper">
      <div className="card-container">
        <div className="news_card-img">
          <img src={article.media} alt={article.title} loading="lazy" />
        </div>
        <div className="news_card-content">
          <strong className="card-content_title">{article.title}</strong>
          <span className="news_card-date">{article.published_date}</span>

          <span className="news_card-summary">{article.summary}</span>
          <div className="news_card-content_footer">
            <span>{article.author}</span>
            <span>{article.rights}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
