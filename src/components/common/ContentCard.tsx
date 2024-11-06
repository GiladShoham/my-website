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
  descriptionLang?: 'Hebrew' | 'English';
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
  descriptionLang = 'English',
  onReadMore
}) => {
  const languageFlag = language === 'Hebrew' ? '🇮🇱' : '🇺🇸';
  const isDescriptionRTL = descriptionLang === 'Hebrew';
  const isTitleRTL = descriptionLang === 'Hebrew';
  const readMoreText = isDescriptionRTL ? 'קרא עוד' : 'Read More';

  return (
    <article className={cardClasses.card}>
      {imageUrl && (
        <div className={cardClasses.imageWrapper}>
          <img src={imageUrl} alt={title} className={cardClasses.image} />
        </div>
      )}
      <div className={cardClasses.content}>
        <h3 className={`${cardClasses.title} ${isTitleRTL ? 'text-right' : ''}`} dir={isTitleRTL ? 'rtl' : 'ltr'}>
          {isTitleRTL ? title : ''} {languageFlag} {!isTitleRTL ? title : ''}
        </h3>
        <div 
          className={`${cardClasses.description} ${isDescriptionRTL ? 'text-right' : ''}`} 
          dir={isDescriptionRTL ? 'rtl' : 'ltr'}
        >
          <p className="line-clamp-3">{description}</p>
          {description.length > 100 && (
            <button
              onClick={onReadMore}
              style={{ cursor: 'pointer' }}
              className="text-blue-600 dark:text-blue-400 hover:underline mt-2 block md:inline-block"
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
              style={{ cursor: 'pointer' }}
              className={`text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ${link.color || ''}`}
            >
              <ExternalLink size={12} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ContentCard; 