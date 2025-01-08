"use client";
import { useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import Image from "next/image";
import MovieContext from "@/app/movieContext";
import AllMovies from "../allMovies/page";

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
    <div className="h-full">
      <div className="relative h-fit mb-6 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg p-6">
        <p className="text-white font-bold text-2xl mb-4 text-center">
          Tv Serious
        </p>

        <div className="relative">
          {/* Left Navigation Button */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            onClick={handlePrev}
          >
            &#8592;
          </button>

          {/* Right Navigation Button */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            onClick={handleNext}
          >
            &#8594;
          </button>

          {/* Tv List */}
          <ul className="flex gap-4 overflow-hidden mt-5">
            {visibleMovies.map((movie) => (
              <li
                key={movie.id}
                className="relative flex-shrink-0 w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%]"
              >
                <Link href={`MovieDetails/${movie.id}`}>
                  <div className="relative">
                    <Image
                      className="rounded-md w-full h-auto transition-transform duration-300 hover:scale-105"
                      src={movie.image}
                      alt={movie.name || movie.original_name}
                      width={400}
                      height={600}
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 rounded-md p-2">
                      <div>
                        <p className="text-gray-50 text-sm sm:text-base font-semibold truncate">
                          {movie.name || movie.original_name}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                          {movie.release_date || movie.date}
                        </p>
                      </div>
                      <FavoriteIcon className="text-gray-50 text-sm sm:text-base md:text-lg" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AllMovies
        moviesData={moviesData}
        title={"All tvSerious"}
        url={`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`}
      />
    </div>
  );
}
