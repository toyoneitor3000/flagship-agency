import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating: number; // 1 to 5
  avatarUrl?: string;
  date?: string;
  link?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, rating, avatarUrl, date, link }) => {
  const CardContent = (
    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-apple-border relative hover:-translate-y-1 hover:shadow-md transition-all duration-300 group shadow-sm flex flex-col h-full">
      <Quote className="absolute top-6 right-6 text-apple-border group-hover:text-apple-blue/10 transition-colors" size={48} />
      
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < rating ? '#0071E3' : 'none'}
              className={i < rating ? 'text-apple-blue' : 'text-apple-blue/20'}
            />
          ))}
        </div>
        <div className="flex items-center text-xs font-medium text-apple-subtext bg-apple-bg px-3 py-1 rounded-full border border-apple-border/50">
          <span className="font-semibold text-gray-700 mr-1">G</span> Google Maps
        </div>
      </div>
      
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className="text-apple-subtext text-lg leading-relaxed font-regular mb-8 flex-grow">"{quote}"</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center">
            {avatarUrl ? (
               <div className="w-12 h-12 relative mr-4 rounded-full overflow-hidden border border-apple-border shrink-0">
                  <Image src={avatarUrl} alt={author} fill className="object-cover" />
               </div>
            ) : (
              <div className="w-12 h-12 bg-apple-bg rounded-full mr-4 flex items-center justify-center text-apple-text font-semibold border border-apple-border shrink-0">
                  {author.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-apple-text tracking-tight leading-tight">{author}</p>
              {date && <p className="text-xs text-apple-subtext mt-0.5">{date}</p>}
            </div>
        </div>
        {link && (
          <div className="text-apple-blue opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={20} />
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

export default TestimonialCard;
