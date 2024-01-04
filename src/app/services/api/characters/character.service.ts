import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Character } from "../models/character"

interface RequestInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface AllCharactersAPIResponse {
  info: RequestInfo
  results: Character[]
}

@Injectable({
  providedIn: "any",
})

export class CharacterService {
  private baseUrl: string = "https://rickandmortyapi.com/api/character"

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  })

  getAllCharacters(): Observable<AllCharactersAPIResponse> {
    const targetUrl: string = `${this.baseUrl}`
    return this.http.get<AllCharactersAPIResponse>(targetUrl, { headers: this.headers })
  }

  getCharacter(id: number): Observable<Character> {
    const targetUrl: string = `${this.baseUrl}/${id}`
    return this.http.get<Character>(targetUrl, { headers: this.headers })
  }

  getCharacters(ids: number[]): Observable<Character[]> {
    const targetUrl: string = `${this.baseUrl}/${ids}`
    return this.http.get<Character[]>(targetUrl, { headers: this.headers })
  }

  getCharactersByUrl(url: string): Observable<AllCharactersAPIResponse> {
    return this.http.get<AllCharactersAPIResponse>(url, { headers: this.headers });
  }
}
