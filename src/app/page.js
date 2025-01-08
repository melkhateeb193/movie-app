"use client"
import ContinueWatch from "./components/continueWatching/page";
import CardsList from "./components/cardList/page";
import { useContext } from 'react';
import MovieContext from "./movieContext";



export default function Home() {
  const { moviesData } = useContext(MovieContext);

  return (
<section className="">
<div className="p-3">
      <h3 className="text-white font-bold mb-4">Continue watching</h3>
      
      <div className="overflow-hidden w-full mb-8"> 
        <ContinueWatch moviesData={moviesData}/>
      </div>

      <div className="mt-8"> 
        <CardsList moviesData={moviesData} name={"Top Movies"} />
      </div>
    </div>
</section>

);
}
