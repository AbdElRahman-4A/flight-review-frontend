"use client";

import { useEffect, useState } from "react";
import API from "@/api/axios";
import Link from "next/link";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await API.get("/flights");
        setFlights(res.data);
      } catch (error) {
        console.error("Error fetching flights", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-blue-600 text-xl font-bold">
        Loading flights...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-14">
        ✈️ Available Flights
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {flight.airline} - {flight.flightNumber}
              </h2>
              <div className="text-gray-700 space-y-2 text-base">
                <p>
                  <span className="font-semibold text-black">From:</span>{" "}
                  {flight.from}
                </p>
                <p>
                  <span className="font-semibold text-black">To:</span>{" "}
                  {flight.to}
                </p>
                <p>
                  <span className="font-semibold text-black">Date:</span>{" "}
                  {new Date(flight.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Link
              href={`/flights/${flight._id}`}
              className="mt-6 block bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-xl transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
