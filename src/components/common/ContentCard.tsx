import React from 'react';
import { cardClasses } from './CardStyles';
import { ExternalLink } from 'lucide-react';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  tags: string[];
  icon: React.ReactNode;
  links: Array<{
    url: string;
    label: string;
    color?: string;
  }>;
  language: 'Hebrew' | 'English';
  onReadMore?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  imageUrl,
  date,
  tags,
  icon,
  links,
  language,
  onReadMore
}) => {
  const languageFlag = language === 'Hebrew' ? '🇮🇱' : '🇺🇸';
  const isRTL = language === 'Hebrew';
  const readMoreText = isRTL ? 'קרא עוד' : 'Read More';

  return (
    <article className={cardClasses.card}>
      {imageUrl && (
        <div className={cardClasses.imageWrapper}>
          <img src={imageUrl} alt={title} className={cardClasses.image} />
        </div>
      )}
      <div className={cardClasses.content}>
        <h3 className={cardClasses.title}>
          {languageFlag} {title}
        </h3>
        <div className={`${cardClasses.description} ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="line-clamp-3">{description}</p>
          {description.length > 100 && (
            <button
              onClick={onReadMore}
              className={`${cardClasses.link} mt-2 block md:inline-block`}
            >
              {readMoreText}
            </button>
          )}
        </div>
        <div className={cardClasses.stats}>
          {icon}
          <span>{date}</span>
        </div>
        <div className={cardClasses.tags}>
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={cardClasses.tag}>{tag}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClasses.link} ${link.color || ''}`}
            >
              <ExternalLink size={12} className="mr-1" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ContentCard; 