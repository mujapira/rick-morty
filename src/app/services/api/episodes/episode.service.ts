import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, map, of } from "rxjs"
import { Character } from "../models/character"
import { Episode } from "../models/episode"

export interface RequestPaginationInfo {
  count: number
  pages: number
  currentPage?: number | null
  next: string | null
  prev: string | null
}

export interface AllEpisodesAPIResponse {
  info: RequestPaginationInfo
  results: Episode[]
}

@Injectable({
  providedIn: "any",
})
export class EpisodeService {
  private baseUrl: string = "https://rickandmortyapi.com/api/episode"

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  })

  getAllEpisodes(): Observable<AllEpisodesAPIResponse> {
    const targetUrl: string = `${this.baseUrl}`
    return this.http.get<AllEpisodesAPIResponse>(targetUrl, {
      headers: this.headers,
    })
  }

  getEpisode(id: number): Observable<Episode> {
    const targetUrl: string = `${this.baseUrl}/${id}`
    return this.http.get<Episode>(targetUrl, { headers: this.headers })
  }

  getEpisodes(ids: number[]): Observable<Episode[]> {
    const targetUrl: string = `${this.baseUrl}/${ids}`
    return this.http.get<Episode[]>(targetUrl, { headers: this.headers })
  }

  getEpisodesByUrl(url: string): Observable<AllEpisodesAPIResponse> {
    return this.http.get<AllEpisodesAPIResponse>(url, {
      headers: this.headers,
    })
  }

  getEpisodeCharacters(residents: string[]): Observable<Character[]> {
    const validResidentIds = residents
      .map(
        (residentUrl) =>
          residentUrl.split("https://rickandmortyapi.com/api/character/")[1]
      )
      .filter((residentId) => residentId)

    if (validResidentIds.length > 0) {
      const targetUrl: string = `https://rickandmortyapi.com/api/character/${validResidentIds
        .join(",")}`
      console.log(targetUrl)

      return this.http.get<any>(targetUrl, { headers: this.headers }).pipe(
        map((response) => {
          const characters = Array.isArray(response) ? response : [response]
          return characters.map((character: Character) => ({
            ...character,
            actualResidents:
              validResidentIds.length === 1 ? validResidentIds : undefined,
          }))
        })
      )
    } else {
      return of([])
    }
  }

  geCharacterEpisodes(episodes: string[]): Observable<Episode[]> {
    const validEpisodeIds = episodes
      .map((url) => url.split("https://rickandmortyapi.com/api/episode/")[1])
      .filter((episodeId) => episodeId)

    if (validEpisodeIds.length > 0) {
      const targetUrl: string = `https://rickandmortyapi.com/api/episode/${validEpisodeIds
        .join(",")}`

      return this.http.get<any>(targetUrl, { headers: this.headers }).pipe(
        map((response) => {
          const episodes = Array.isArray(response) ? response : [response]
          return episodes.map((episode: Episode) => ({
            ...episode,
            actualEpisodes:
              validEpisodeIds.length === 1 ? validEpisodeIds : undefined,
          }))
        })
      )
    } else {
      return of([])
    }
  }
}
