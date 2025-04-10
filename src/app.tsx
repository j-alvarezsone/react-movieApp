import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { discoverMovies } from "./api/movies/discover";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: discoverMovies,
    retry: false,
  });

  ;

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img
            src="./hero.png"
            alt="Hero Banner"
          />
          <h1>
            Find
            <span className="text-gradient">Movie</span>
            You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading && <Spinner />}
          {error && <p className="text-red-500">{error.message}</p>}
          {movie?.results && (
            <ul>
              {movie.results.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
