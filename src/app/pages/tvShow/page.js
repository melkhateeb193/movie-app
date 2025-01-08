"use client";
import { useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import Image from "next/image";
import MovieContext from "@/app/movieContext";

export default function TvShow() {
  const { moviesData } = useContext(MovieContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0
        ? prev - 1
        : Math.max(0, Math.ceil(moviesData.length / itemsPerPage) - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < Math.ceil(moviesData.length / itemsPerPage) - 1 ? prev + 1 : 0
    );
  };

  const visibleMovies = moviesData.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );
  return (
    <div className="relative h-screen">
      <p className="text-white font-bold mb-4">tv Shows</p>
      <div className="relative overflow-hidden">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
          onClick={handlePrev}
        >
          &#8592;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
          onClick={handleNext}
        >
          &#8594;
        </button>
        {/* Movies List */}
        <ul className="mt-5 flex gap-[1.5rem] justify-center transition-transform duration-300 ease-in-out sm:flex-nowrap sm:gap-6 sm:px-4 overflow-hidden">
          {visibleMovies.map((movie, index) => (
            <li
              key={movie.id}
              className={`relative cursor-pointer w-full sm:w-auto ${
                index === 0 ? "block" : "hidden sm:block"
              }`}
            >
              <Link href={`tvShowDetails/${movie.id}`}>
                <Image
                  className="rounded-[1rem] w-full sm:w-[14.06rem] sm:h-[20.25rem]"
                  src={movie.image}
                  alt={movie.title || movie.name}
                  width={500}
                  height={750}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-transparent flex items-center justify-between px-2 sm:px-3 lg:px-4 w-full">
                  <div className="flex flex-col">
                    <p className="text-gray-50 text-xs sm:text-sm md:text-base font-semibold bg-transparent">
                      {movie.name}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base bg-transparent">
                      {movie.date}
                    </p>
                  </div>
                  <FavoriteIcon className="text-gray-50 text-base sm:text-lg md:text-xl" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
