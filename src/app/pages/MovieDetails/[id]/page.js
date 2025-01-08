"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import MovieContext from "@/app/movieContext";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Zjg1M2Q0NjRhYzk1NGZmMzc2NTI1MzcwMTIwZjNiZCIsIm5iZiI6MTY4NTAwNTcyNS40ODYsInN1YiI6IjY0NmYyNTlkNzFmZmRmMDBjNDUxYWZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BR1bxweUOwReNNcWHwXkbtCXq2WMeC0qGYbd2isC2Bk",
  },
};

export default function MovieDetails({ params }) {
  const { setAddFav } = useContext(MovieContext);
  const [id, setId] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  // Wait for params to be resolved
  useEffect(() => {
    if (params?.id) {
      setId(params.id);
    }
  }, [params]); // Dependency on params, so it runs when params change

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]); // Fetch details when id changes

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  const handleAddToFav = (movie) => {
    setAddFav((prev) => {
      const isAlreadyExist = prev.some((fav) => fav.id === movie.id);
      if (!isAlreadyExist) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  return (
    <div className="container mx-auto flex justify-center items-center mt-3 border-4 rounded-3xl p-3 bg-gradient-to-r from-blue-500 to-purple-500">
      <Image
        className="w-1/4 h-auto rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
        width={550}
        height={400}
      />
      <div className="ml-3">
        <h1 className="text-white text-xl font-semibold">
          Movie Name: {movieDetails.title}
        </h1>
        <p className="text-white mt-2">Description: {movieDetails.overview}</p>
        <p className="text-white mt-2">Release Date: {movieDetails.release_date}</p>
        <p className="text-white mt-2">Vote Average: {movieDetails.vote_average}</p>
        <p className="text-white mt-2">
          Genres: {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <div className="flex gap-6">
          <button className="mt-4 px-4 py-2 bg-sky-900 text-white rounded-full hover:bg-sky-300 transition">
            Watch Now
          </button>
          <button
            onClick={() => handleAddToFav(movieDetails)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Add to fav
          </button>
        </div>
      </div>
    </div>
  );
}