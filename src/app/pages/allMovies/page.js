"use client";
import Image from "next/image";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

export default function AllMovies({ url, title }) {
  const [page, setPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(url);
      try {
        const response = await fetch(`${url}&page=${page}`, options);

        if (!response.ok) {
          throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const result = await response.json();
        const transformedData = result.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          name: movie.name,
          year: movie.release_date
            ? movie.release_date.split("-")[0]
            : "Unknown",
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          released: movie.release_date,
          vote: movie.vote_average,
          overview: movie.overview,
          date: movie.first_air_date,
        }));

        setMoviesData(transformedData);
        setTotalPages(result.total_pages);
        console.log(result.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [page]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Zjg1M2Q0NjRhYzk1NGZmMzc2NTI1MzcwMTIwZjNiZCIsIm5iZiI6MTY4NTAwNTcyNS40ODYsInN1YiI6IjY0NmYyNTlkNzFmZmRmMDBjNDUxYWZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BR1bxweUOwReNNcWHwXkbtCXq2WMeC0qGYbd2isC2Bk", // Replace with your actual API key
    },
  };
  console.log(moviesData);
  return (
    <div>
      <div>
        <p>{title}</p>
        <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1.5rem] sm:gap-6 px-4 overflow-hidden transition-transform duration-300 ease-in-out">
          {moviesData.map((movie) => (
            <li key={movie.id} className="relative cursor-pointer w-full">
              <Link href={`MovieDetails/${movie.id}`}>
                <Image
                  className="rounded-[1rem] w-full h-auto sm:w-[12rem] sm:h-[18rem] lg:w-[14.06rem] lg:h-[20.25rem]"
                  src={movie.image}
                  alt={movie.name || movie.title}
                  width={500}
                  height={750}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-transparent flex items-center justify-between px-2 sm:px-3 lg:px-4 w-full">
                  <div className="flex flex-col">
                    <p className="text-gray-50 text-xs sm:text-sm md:text-base font-semibold bg-transparent">
                      {movie.title || movie.name}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base bg-transparent">
                      {movie.date || movie.year}
                    </p>
                  </div>
                  <FavoriteIcon className="text-gray-50 text-base sm:text-lg md:text-xl" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-5 mb-5">
        <button
          onClick={handlePrevPage}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition duration-300"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
        <p className="text-lg font-medium text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-900 rounded-md px-4 py-2">
          {page} 
        </p>
        <button
          onClick={handleNextPage}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition duration-300"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
