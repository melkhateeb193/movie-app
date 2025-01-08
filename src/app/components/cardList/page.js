"use client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import Link from "next/link";

export default function CardsList({ moviesData }) {
  if (!moviesData || moviesData.length === 0) {
    return <p>Loading movies...</p>;
  }
  return (
    <div className="mt-5">
      <p className="text-white font-bold text-lg sm:text-xl">Top rated</p>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1.5rem]">
        {moviesData
          .filter((movie) => movie.vote > 7)
          .map((movie) => {
            return (
              <li key={movie.id} className="relative cursor-pointer">
                <Link href={`pages/MovieDetails/${movie.id}`}>
                  <Image
                    className="rounded-[1rem] w-full h-auto"
                    src={movie.image}
                    alt={movie.title}
                    width={500}
                    height={750}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-transparent flex items-center justify-between px-2 sm:px-3 lg:px-4 w-full">
                    <div className="flex flex-col">
                      <p className="text-gray-100 text-xs sm:text-sm md:text-base font-semibold bg-transparent">
                        {movie.title}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base bg-transparent">
                        {movie.year}
                      </p>
                    </div>
                    <FavoriteIcon className="text-gray-50 text-base sm:text-lg md:text-xl" />
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
