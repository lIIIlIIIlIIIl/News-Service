import { HeadlineData } from "../../types/Headline";
import "./HeadlineCard.css";

interface HeadlineCardProps {
  article: HeadlineData;
}

const HeadlineCard = ({ article }: HeadlineCardProps) => {
  return (
    <a href={article.link} target="_blank" className="card-wrapper">
      <div className="card-img">
        <img src={article.media} alt={article.title} loading="lazy" />
      </div>
      <div className="card-content">
        <strong className="card-content_title">{article.title}</strong>
        <span>{article.author}</span>
        <span>{article.published_date}</span>
        <span>{article.rights}</span>
      </div>
    </a>
  );
};

export default HeadlineCard;
