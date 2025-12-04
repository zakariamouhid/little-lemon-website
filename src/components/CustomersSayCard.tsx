export function CustomersSayCard({
  rating,
  name,
  handle,
  description,
  image,
}: {
  rating: number;
  name: string;
  handle: string;
  description: string;
  image: string;
}) {
  return (
    <article className="testimonials-card">
      <div className="testimonials-card-header">
        <div className="testimonials-card-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L10.2426 5.28571H16L11.2857 8.57143L13.5283 13.8571L8 10.5714L2.47168 13.8571L4.71429 8.57143L0 5.28571H5.75736L8 0Z"
                fill={index < rating ? "#F4CE14" : "#D9D9D9"}
              />
            </svg>
          ))}
        </div>
        <div className="testimonials-card-author">
          <img
            src={image}
            alt={name}
            className="testimonials-card-image"
            width={100}
            height={100}
          />
          <div className="testimonials-card-author-info">
            <h3 className="testimonials-card-title">{name}</h3>
            <h4 className="testimonials-card-handle">@{handle}</h4>
          </div>
        </div>
      </div>
      <p className="testimonials-card-description">{description}</p>
    </article>
  );
}
