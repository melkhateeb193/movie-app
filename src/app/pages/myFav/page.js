"use client"
import MovieContext from "@/app/movieContext";
import Image from "next/image";
import { useContext } from "react";

export default function MyFav() {
  const { addfav  } = useContext(MovieContext);

  return (
    <div className="mt-5 h-full">
      <p className="text-white font-bold text-lg sm:text-xl">My Favorites</p>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1.5rem]">
        {addfav.map((movie) => (
          <li key={movie.id} className="relative cursor-pointer">
            <Image
              className="rounded-[1rem] w-full h-auto"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title||movie.name}
              width={500} 
              height={750} 
            />
            <div className="absolute bottom-2 left-2 right-2 bg-transparent flex items-center justify-between px-2 sm:px-3 lg:px-4 w-full">
              <div className="flex flex-col">
                <p className="text-gray-50 text-xs sm:text-sm md:text-base font-semibold bg-transparent">
                  {movie.title||movie.name}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base bg-transparent">
                  {movie.release_date?.slice(0, 4) || movie.date} 
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
