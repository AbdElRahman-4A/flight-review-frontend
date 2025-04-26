"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/api/axios";

export default function AddReview() {
  const router = useRouter();
  const params = useParams();
  const flightId = params.id;

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
    staffRating: "",
    foodRating: "",
    cleanlinessRating: "",
    takeoffLandingRating: "",
  });
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // 🛡️ Check Authorization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // 🚀 Redirect to login if no token
      } else {
        setAuthorized(true);
      }
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post(
        "/reviews",
        {
          flight: flightId,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Review added successfully!");
      router.push(`/flights/${flightId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add review.");
    }
  };

  if (!authorized) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-600 font-bold">
        Checking authorization...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Add Your Review
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="space-y-5">
          <input
            type="number"
            name="rating"
            placeholder="Overall Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-3 border text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />

          <textarea
            name="comment"
            placeholder="Write your comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-3 border text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>

          <input
            type="number"
            name="staffRating"
            placeholder="Staff Rating (1-5)"
            value={formData.staffRating}
            onChange={handleChange}
            className="w-full p-3 border text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />

          <input
            type="number"
            name="foodRating"
            placeholder="Food Rating (1-5)"
            value={formData.foodRating}
            onChange={handleChange}
            className="w-full p-3 border text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />

          <input
            type="number"
            name="cleanlinessRating"
            placeholder="Cleanliness Rating (1-5)"
            value={formData.cleanlinessRating}
            onChange={handleChange}
            className="w-full p-3 border text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />

          <input
            type="number"
            name="takeoffLandingRating"
            placeholder="Takeoff & Landing Rating (1-5)"
            value={formData.takeoffLandingRating}
            onChange={handleChange}
            className="w-full p-3 border text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
