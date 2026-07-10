import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string | JSX.Element;
  imageUrl: string;
  price?: string;
  promotion?: string;
  benefits?: string[];
  imageClassName?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl, price, promotion, benefits, imageClassName }) => {
  return (
    <div className="group relative bg-white border border-apple-border rounded-[2rem] overflow-hidden transition-all duration-500 h-full flex flex-col hover:shadow-md hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-apple-bg flex items-center justify-center">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>

        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 z-10 ${imageClassName || 'object-cover'}`}
        />

        {/* Promotion Badge */}
        {promotion && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-apple-blue text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-sm backdrop-blur-md">
              ✨ {promotion}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow relative bg-transparent">
        {/* Title */}
        <div className="mb-5">
          <h3 className="text-2xl font-semibold text-apple-text group-hover:text-apple-blue transition-colors duration-300 tracking-tight leading-tight">
            {title}
          </h3>
        </div>

        {/* Benefits Section - Highlighted */}
        {benefits && benefits.length > 0 && (
          <div className="mb-6 bg-apple-bg rounded-2xl p-5 border border-apple-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-apple-blue uppercase tracking-wider">
                Beneficios Incluidos
              </span>
            </div>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-apple-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-apple-subtext font-regular leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="text-apple-subtext text-sm mb-8 flex-grow leading-relaxed">
          {typeof description === 'string' ? <p className="font-regular">{description}</p> : description}
        </div>

        {/* Price Section */}
        {price && (
          <div className="mb-8 pt-6 border-t border-apple-border">
            <p className="text-[11px] text-apple-subtext uppercase tracking-wider mb-1 font-medium">
              Inversión desde
            </p>
            <p className="text-3xl font-semibold text-apple-text tracking-tight">{price}</p>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={`https://wa.me/573124730909?text=Hola,%20estoy%20interesado%20en%20cotizar%20${title.replace(/ /g, '%20')}%20para%20mi%20vehículo.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn w-full bg-white hover:bg-apple-bg text-apple-text border border-apple-border hover:border-apple-blue/50 font-medium py-3.5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
        >
          <span className="mr-2 text-sm tracking-wide">
            Cotizar Experiencia
          </span>
          <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:text-apple-blue" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
