import React from 'react';
import TestimonialCard from './TestimonialCard';

async function getReviews() {
  const apiKey = process.env.SERPAPI_KEY;
  const dataId = process.env.SERPAPI_DATA_ID;
  
  if (!apiKey || !dataId) {
    return null;
  }

  try {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${dataId}&api_key=${apiKey}`,
      { next: { revalidate: 86400 } } // Revalidate every 24 hours (86400 seconds)
    );
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.reviews || null;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
}

const TestimonialsSection = async () => {
  const reviews = await getReviews();

  // Filter good reviews (e.g. 4 or 5 stars) and show all of them
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bestReviews = reviews 
    ? reviews.filter((r: any) => r.rating >= 4)
    : [];

  const displayReviews = bestReviews.length > 0 ? bestReviews : [
    // Fallbacks if API fails or no reviews
    {
      rating: 5,
      snippet: "La atención al detalle es obsesiva. Mi BMW quedó mejor que cuando salió del concesionario.",
      user: { name: "Ricardo M." },
      date: "Hace 1 semana",
      link: "https://www.google.com/maps"
    },
    {
      rating: 5,
      snippet: "Instalaron PPF en mi camioneta y es invisible. Vale cada peso por la tranquilidad que brinda.",
      user: { name: "Diana S." },
      date: "Hace 1 mes",
      link: "https://www.google.com/maps"
    },
    {
      rating: 5,
      snippet: "Profesionalismo puro. Cumplieron con los tiempos y el acabado del cerámico es un espejo.",
      user: { name: "Felipe T." },
      date: "Hace 2 meses",
      link: "https://www.google.com/maps"
    }
  ];

  return (
    <section className="py-32 bg-apple-bg border-t border-apple-border relative">

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-apple-text mb-6 tracking-tight">Voces de la Excelencia</h2>
          <p className="text-lg md:text-xl text-apple-subtext font-regular max-w-2xl mx-auto">
            Descubre lo que nuestros clientes dicen sobre su experiencia en Victory Cars.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {displayReviews.map((review: any, index: number) => (
            <TestimonialCard
              key={index}
              rating={Math.floor(review.rating) || 5}
              quote={review.snippet || "Excelente servicio."}
              author={review.user?.name || "Cliente"}
              avatarUrl={review.user?.thumbnail}
              date={review.date}
              link={review.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
