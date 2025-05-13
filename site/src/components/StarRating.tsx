interface Props {
  rating: number;
}

export default function StarRating({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-accent">★</span>
      ))}
      {hasHalfStar && <span className="text-accent">½</span>}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <span key={i} className="text-muted">★</span>
      ))}
    </div>
  );
} 