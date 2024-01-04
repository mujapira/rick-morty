import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Character } from "../models/character"
import { Episode } from "../models/episode"

interface EpisodeInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface AllEpisodesAPIResponse {
  info: EpisodeInfo
  results: Episode
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

  getAllEpisodes(): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}`
    return this.http.get<AllEpisodesAPIResponse>(targetUrl, {
      headers: this.headers,
    })
  }

  getEpisode(id: number): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}/${id}`
    return this.http.get<Episode>(targetUrl, { headers: this.headers })
  }

  getEpisodes(ids: number[]): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}/${ids}`
    return this.http.get<Episode[]>(targetUrl, { headers: this.headers })
  }
}
