import type { Movie } from "../../types/movie";

import tmdbApi from "..";
import { updateSearchCount } from "../../appwrite";

export async function fetchMovies(query: string = "") {
  const endpoint = query ? `/search/movie?query=${encodeURIComponent(query)}` : `/discover/movie?sort_by=popularity.desc`;
  const resp = await tmdbApi.get<Movie>(endpoint);

  if (query && resp.data.results.length > 0) {
    await updateSearchCount(query, resp.data.results[0]);
  }

  return resp.data;
}
