"use client"
import Link from "next/link";
import "./globals.css";
import SideNav from "./components/sideNav/page";
import TopNav from "./components/TopNav/page";
import { useEffect, useState } from "react";
import Head from "next/head";
import MovieContext from "./movieContext";

import { Poppins } from 'next/font/google'; 
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], 
  subsets: ['latin'], 
  display: 'swap', 
});
export default function RootLayout({ children }) {
  const [type ,setType]= useState('movie/popular?language=en-US&page=1')
  const [moviesData, setMoviesData] = useState([]);
  const [addfav ,setAddFav]= useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const result = await response.json();
          const transformedData = result.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            name:movie.name,
            year: movie.release_date ? movie.release_date.split("-")[0] : "Unknown",
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            released: movie.release_date, 
            vote: movie.vote_average,
            overview: movie.overview, 
            date: movie.first_air_date
            , 
          }));
        setMoviesData(transformedData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [type]); 
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Zjg1M2Q0NjRhYzk1NGZmMzc2NTI1MzcwMTIwZjNiZCIsIm5iZiI6MTY4NTAwNTcyNS40ODYsInN1YiI6IjY0NmYyNTlkNzFmZmRmMDBjNDUxYWZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BR1bxweUOwReNNcWHwXkbtCXq2WMeC0qGYbd2isC2Bk", // Replace with your actual API key
  },
}; 


  return (
    <html lang="en">
      <body className={poppins}>
      <Head>
          <title>Movie-App</title>
          <meta name="description" content="Stream the best movies here" />
        </Head>
        <MovieContext.Provider  value={{type ,moviesData ,setAddFav ,addfav}}>
          
      <main className="flex sm:flex-row flex-col h-screen bg-double-images bg-no-repeat bg-top-left-bottom-right bg-contain-and-contain p-4">
      {/* Sidebar */}
      <aside className="sideNav flex-initial w-full sm:w-[30%] md:w-[20%] flex items-center justify-center flex-col gap-7 sm:mr-2  sm:border-r-2 border-gray-600">
        <h2 >
          <Link className="text-2xl font-bold text-outLine text-transparent" href='/'> STREAM</Link>
         
        </h2>
        <SideNav addfav={addfav}  setType={setType} />
      </aside>

      {/* Main Content */}
      <div className="flex-initial w-full sm:w-[70%] md:w-[80%]">
        <TopNav />
        {children}
      </div>
    </main>
    </MovieContext.Provider>
      </body>
    </html>
  );
}
