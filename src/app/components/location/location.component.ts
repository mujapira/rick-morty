import { Component } from "@angular/core"
import { Location } from "../../services/api/models/location"
import { LocationService } from "../../services/api/locations/location.service"
import { Router, RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-location",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./location.component.html",
})
export class LocationComponent {
  location: Location = {} as Location
  targetId: string | undefined = undefined

  constructor(private service: LocationService, private router: Router) {}

  characterList: Location[] = [] as Location[]

  ngOnInit() {
    this.targetId = this.router.url.split("/").pop()
    this.loadLocation()
  }

  loadLocation(): void {
    if (this.targetId === undefined) {
      return
    }
    this.service
      .getLocation(Number(this.targetId))
      .subscribe((data: Location) => {
        this.location = data
      })
  }
}
