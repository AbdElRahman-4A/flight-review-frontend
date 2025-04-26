"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/api/axios";
import Link from "next/link";

export default function FlightDetails() {
  const params = useParams();
  const router = useRouter();
  const flightId = params.id;
  const [flight, setFlight] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightAndReviews = async () => {
      try {
        const resFlight = await API.get(`/flights/${flightId}`);
        const resReviews = await API.get(`/reviews/${flightId}`);
        setFlight(resFlight.data);
        setReviews(resReviews.data);
      } catch (error) {
        console.error("Error fetching flight details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightAndReviews();
  }, [flightId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 font-bold">
        Loading flight details...
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-bold">
        Flight not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100  px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          {flight.airline} - {flight.flightNumber}
        </h1>

        <div className="text-gray-700 text-lg space-y-2 text-center mb-8">
          <p>
            <span className="font-bold text-black">From:</span> {flight.from}
          </p>
          <p>
            <span className="font-bold text-black">To:</span> {flight.to}
          </p>
          <p>
            <span className="font-bold text-black">Date:</span>{" "}
            {new Date(flight.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <Link
            href={`/flights/${flightId}/review`}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition"
          >
            Add Review
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Passenger Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 p-6 rounded-2xl shadow-md"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500 font-bold">
                      {review.rating} ⭐
                    </span>
                    <span className="font-bold text-blue-700 text-lg">
                      Overall
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    By: {review.user?.name || "Anonymous"}
                  </div>
                </div>

                {review.comment && (
                  <p className="italic text-gray-700 mb-4 text-center">
                    "{review.comment}"
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
                  <div>👨‍✈️ Staff: {review.staffRating} ⭐</div>
                  <div>🍔 Food: {review.foodRating} ⭐</div>
                  <div>🧹 Cleanliness: {review.cleanlinessRating} ⭐</div>
                  <div>
                    🛫 Takeoff/Landing: {review.takeoffLandingRating} ⭐
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
