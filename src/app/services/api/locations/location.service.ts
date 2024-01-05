import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, map, of } from "rxjs"
import { Location } from "../models/location"
import { Character } from "../models/character"

export interface PaginationInfo {
  count: number
  currentPage?: number | null
  pages: number
  next: string | null
  prev: string | null
}

export interface AllLocationsAPIResponse {
  info: PaginationInfo
  results: Location[]
}

@Injectable({
  providedIn: "any",
})
export class LocationService {
  private baseUrl: string = "https://rickandmortyapi.com/api/location"

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  })

  getAllLocations(): Observable<AllLocationsAPIResponse> {
    const targetUrl: string = `${this.baseUrl}`
    return this.http.get<AllLocationsAPIResponse>(targetUrl, {
      headers: this.headers,
    })
  }

  getLocation(id: number): Observable<Location> {
    const targetUrl: string = `${this.baseUrl}/${id}`
    return this.http.get<Location>(targetUrl, { headers: this.headers })
  }

  getLocations(ids: number[]): Observable<Location[]> {
    const targetUrl: string = `${this.baseUrl}/${ids}`
    return this.http.get<Location[]>(targetUrl, { headers: this.headers })
  }

  getLocationsByUrl(url: string): Observable<AllLocationsAPIResponse> {
    return this.http.get<AllLocationsAPIResponse>(url, {
      headers: this.headers,
    })
  }

 getLocationResidents(residents: string[]): Observable<Character[]> {
  const validResidentIds = residents
    .map(residentUrl => residentUrl.split('https://rickandmortyapi.com/api/character/')[1])
    .filter(residentId => residentId);

  if (validResidentIds.length > 0) {
    const targetUrl: string = `https://rickandmortyapi.com/api/character/${validResidentIds.slice(0, 20).join(',')}`;
    console.log(targetUrl);

    return this.http.get<any>(targetUrl, { headers: this.headers }).pipe(
      map(response => {
        const characters = Array.isArray(response) ? response : [response];
        return characters.map((character: Character) => ({
          ...character,
          actualResidents: validResidentIds.length === 1 ? validResidentIds : undefined,
        }));
      })
    );
  } else {
    return of([]);
  }
}

}
