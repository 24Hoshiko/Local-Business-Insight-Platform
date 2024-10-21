import React from 'react';

const reviews = [
  {
    name: "John Doe",
    business: "Doe's Bakery",
    review:
      "Business Insights has transformed how we understand our customers! Their analytics helped us streamline our operations and increase profits.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Sample avatar
  },
  {
    name: "Jane Smith",
    business: "Smith's Hardware",
    review:
      "The insights we get are invaluable! We’ve seen significant improvements in sales after implementing the recommendations.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg", // Sample avatar
  },
  {
    name: "Michael Johnson",
    business: "Johnson's Coffee House",
    review:
      "As a local business, I can say this platform has helped us grow and understand our community better. Highly recommended!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/86.jpg", // Sample avatar
  },
];

const Review = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, #ffe4c4, #f4d6d7)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          What Local Business Owners Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={`${review.name}'s avatar`}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-gray-500">{review.business}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{review.review}"</p>
              <div className="flex">
                {/* Render star ratings */}
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.97 0 1.371 1.24.588 1.81l-3.37 2.453a1 1 0 00-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.37-2.453a1 1 0 00-1.176 0l-3.37 2.453c-.785.57-1.84-.197-1.54-1.118l1.286-3.958a1 1 0 00-.363-1.118L2.85 9.385c-.783-.57-.382-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
