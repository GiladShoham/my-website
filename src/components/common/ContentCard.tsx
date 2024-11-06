import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  date: Date;
  metadata?: {
    podcastName?: string;
    episodeNumber?: string;
    conference?: string;
  };
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
  metadata,
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatMetadata = () => {
    if (!metadata) return '';
    const parts = [];
    if (metadata.conference) parts.push(metadata.conference);
    if (metadata.podcastName) {
      parts.push(metadata.podcastName);
      if (metadata.episodeNumber) parts.push(`#${metadata.episodeNumber}`);
    }
    return parts.length > 0 ? ` • ${parts.join(' - ')}` : '';
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full">
      <div className="flex flex-col h-full">
        {imageUrl && (
          <div className="w-full h-64">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-1">
          {/* Title Container - Fixed Height */}
          <div className="min-h-[3rem] mb-2">
            <h3 
              className={`text-xl font-semibold ${isTitleRTL ? 'text-right' : ''} line-clamp-2`} 
              dir={isTitleRTL ? 'rtl' : 'ltr'}
            >
              {isTitleRTL ? title : ''} {languageFlag} {!isTitleRTL ? title : ''}
            </h3>
          </div>

          {/* Content Container */}
          <div className="flex flex-col flex-1">
            {/* Description Section */}
            <div 
              className={`${isDescriptionRTL ? 'text-right' : ''}`} 
              dir={isDescriptionRTL ? 'rtl' : 'ltr'}
            >
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
              {description.length > 100 && onReadMore && (
                <button
                  onClick={onReadMore}
                  className="text-blue-600 dark:text-blue-400 hover:underline mt-2"
                >
                  {readMoreText}
                </button>
              )}
            </div>

            {/* Footer Section */}
            <div className="mt-auto pt-6 space-y-4">
              {/* Date and Metadata */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                {icon}
                <span className="ml-2">
                  {formatDate(date)}
                  {formatMetadata()}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm ${link.color || 'text-blue-600 dark:text-blue-400'} hover:underline`}
                  >
                    <ExternalLink size={12} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContentCard; 