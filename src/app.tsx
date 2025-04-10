import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "react-use";

import { fetchMovies } from "./api/movies";
import { getTrendingMovies } from "./appwrite";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movies", debouncedSearchTerm],
    queryFn: () => fetchMovies(debouncedSearchTerm),
    retry: false,
  });

  const { data: trendingMovies, isLoading: isTrendingMoviesLoading, error: trendingMoviesError } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => getTrendingMovies(),
    retry: false,
  });

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
        {trendingMovies && trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            {isTrendingMoviesLoading && <Spinner />}
            {trendingMoviesError && <p className="text-red-500">{trendingMoviesError.message}</p>}
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>

          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
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
