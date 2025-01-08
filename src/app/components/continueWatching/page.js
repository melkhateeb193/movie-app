"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ContinueWatch({ moviesData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (moviesData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % moviesData.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [moviesData]);
  if (!moviesData || moviesData.length === 0) {
    return <p>Loading movies...</p>;
  }
  return (
    <div className="movie-container relative">
      <ul className="flex gap-3 transition-transform duration-500">
        {moviesData.length === 0 ? (
          <p>Loading movies...</p>
        ) : (
          moviesData.map((movie) => (
            <li
              key={movie.id}
              className="relative cursor-pointer w-full sm:w-[34.38rem] sm:h-[26.13rem] flex-none"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`,
              }}
            >
              <Link href={`pages/MovieDetails/${movie.id}`}>
                <Image
                  className="rounded-[1rem] w-full h-auto mx-auto"
                  src={movie.image}
                  alt={movie.title}
                  width={550}
                  height={400}
                />
                <div className="absolute bottom-2 left-3 bg-transparent">
                  <p className="text-gray-50 font-semibold bg-transparent">
                    {movie.title}
                  </p>
                  <p className="text-sm text-gray-300 bg-transparent">
                    {movie.year}
                  </p>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
