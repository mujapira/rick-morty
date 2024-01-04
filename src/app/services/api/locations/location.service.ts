import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

interface LocationInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface AllLocationsAPIResponse {
  info: LocationInfo
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

  getAllLocations(): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}`
    return this.http.get<AllLocationsAPIResponse>(targetUrl, {
      headers: this.headers,
    })
  }

  getLocation(id: number): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}/${id}`
    return this.http.get<Location>(targetUrl, { headers: this.headers })
  }

  getLocations(ids: number[]): Observable<Object> {
    const targetUrl: string = `${this.baseUrl}/${ids}`
    return this.http.get<Location[]>(targetUrl, { headers: this.headers })
  }
}
