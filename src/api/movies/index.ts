import type { Movie } from "../../types/movie";

import tmdbApi from "..";

export async function fetchMovies(query: string = "") {
  const endpoint = query ? `/search/movie?query=${encodeURIComponent(query)}` : `/discover/movie?sort_by=popularity.desc`;
  const resp = await tmdbApi.get<Movie>(endpoint);

  return resp.data;
}
