import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Character } from "../models/character"

interface CharacterInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface AllCharactersAPIResponse {
  info: CharacterInfo
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

  getAllCharacters(): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}`
    return this.http.get<AllCharactersAPIResponse>(targetUrl, { headers: this.headers })
  }

  getCharacter(id: number): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}/${id}`
    return this.http.get<Character>(targetUrl, { headers: this.headers })
  }

  getCharacters(ids: number[]): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}/${ids}`
    return this.http.get<Character[]>(targetUrl, { headers: this.headers })
  }
}
