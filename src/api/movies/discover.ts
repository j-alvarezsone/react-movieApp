import type { Movie } from "../../types/movie";

import tmdbApi from "..";

export async function discoverMovies() {
  const resp = await tmdbApi.get<Movie>("/discover/movie?sort_by=popularity.desc");

  return resp.data;
}
