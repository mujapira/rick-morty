import { Component } from "@angular/core"
import { NgIcon, provideIcons } from "@ng-icons/core"
import {
  matKeyboardDoubleArrowRightOutline,
  matKeyboardDoubleArrowLeftOutline,
  matKeyboardArrowRightOutline,
  matKeyboardArrowLeftOutline,
  matBadgeOutline,
  matAccountBoxOutline,
  matMaleOutline,
  matFemaleOutline,
  matHelpOutline,
  matDangerousOutline,
  matFavoriteOutline,
  matDoNotDisturbOnOutline,
  matCategoryOutline,
  matPinDropOutline,
  matFavoriteBorderOutline,
} from "@ng-icons/material-icons/outline"
import {
  AllLocationsAPIResponse,
  LocationService,
  PaginationInfo,
} from "../../services/api/locations/location.service"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { Location } from "../../services/api/models/location"
import { Observable, forkJoin, map } from "rxjs"
import { Character } from "../../services/api/models/character"

@Component({
  selector: "app-locations",
  standalone: true,
  imports: [NgIcon, CommonModule],
  templateUrl: "./locations.component.html",
  viewProviders: [
    provideIcons({
      matKeyboardDoubleArrowRightOutline,
      matKeyboardDoubleArrowLeftOutline,
      matKeyboardArrowRightOutline,
      matAccountBoxOutline,
      matKeyboardArrowLeftOutline,
      matBadgeOutline,
      matMaleOutline,
      matFemaleOutline,
      matHelpOutline,
      matCategoryOutline,
      matDangerousOutline,
      matFavoriteOutline,
      matDoNotDisturbOnOutline,
      matPinDropOutline,
      matFavoriteBorderOutline,
    }),
  ],
})
export class LocationsComponent {
  locationList: Location[] = [] as Location[]
  paginationInfo: PaginationInfo = {} as PaginationInfo
  isNewPageLoaded: boolean = false

  constructor(private service: LocationService, private router: Router) {}

  ngOnInit(): void {
    this.loadLocations()
  }

  loadLocations(): void {
    this.service
      .getAllLocations()
      .subscribe((allLocationData: AllLocationsAPIResponse) => {
        this.paginationInfo = allLocationData.info;
        this.paginationInfo.currentPage = 1;

        forkJoin(
          allLocationData.results.map((location) =>
            this.service.getLocationResidents(location.residents).pipe(
              map((residentsData: Character[]) =>({
                ...location,
                actualResidents: residentsData
              }))
            )
          )
        ).subscribe((updatedLocations: Location[]) => {
            this.locationList = updatedLocations;
          });
      });
  }

  handlePageNumber(command: string): void {
    const changeValue = (delta: number): string => {
      if (this.paginationInfo.currentPage) {
        const newPage = this.paginationInfo.currentPage + delta
        return `page=${newPage}`
      } else {
        return ""
      }
    }
    switch (command) {
      case "next":
        if (this.paginationInfo.next) {
          this.handlePageChange(this.paginationInfo.next)
        }
        break
      case "prev":
        if (this.paginationInfo.prev) {
          this.handlePageChange(this.paginationInfo.prev)
        }
        break
      case "superNext":
        if (
          this.paginationInfo.currentPage &&
          this.paginationInfo.currentPage + 5 < this.paginationInfo.pages &&
          this.paginationInfo.next
        ) {
          this.handlePageChange(
            this.paginationInfo.next.replace(/page=(\d+)/, (_, p1) =>
              changeValue(5)
            )
          )
        }
        break
      case "superPrev":
        if (
          this.paginationInfo.currentPage &&
          this.paginationInfo.currentPage - 5 >= 1 &&
          this.paginationInfo.prev
        ) {
          this.handlePageChange(
            this.paginationInfo.prev.replace(/page=(\d+)/, (_, p1) =>
              changeValue(-5)
            )
          )
        }
        break
      case "first":
        if (
          this.paginationInfo.prev &&
          this.paginationInfo.currentPage &&
          this.paginationInfo.currentPage > 1
        ) {
          this.handlePageChange(
            this.paginationInfo.prev.replace(/page=(\d+)/, "page=1")
          )
        }
        break
      case "last":
        if (
          this.paginationInfo.next &&
          this.paginationInfo.currentPage &&
          this.paginationInfo.currentPage < this.paginationInfo.pages
        ) {
          this.handlePageChange(
            this.paginationInfo.next.replace(
              /page=(\d+)/,
              `page=${this.paginationInfo.pages}`
            )
          )
        }
        break
      default:
        break
    }
  }

  handlePageChange(url: string): void {
    this.shrinkCards()
    setTimeout(() => {
      this.service
        .getLocationsByUrl(url)
        .subscribe((data: AllLocationsAPIResponse) => {
          this.paginationInfo = data.info;
          this.paginationInfo.currentPage = 1;
          this.paginationInfo.currentPage = this.getPageNumberFromUrl(url)
      
          forkJoin(
            data.results.map((location) =>
              this.service.getLocationResidents(location.residents).pipe(
                map((residentsData: Character[]) => ({
                  ...location,
                  actualResidents: residentsData
                }))
              )
            )
          ).subscribe(
            (updatedLocations: Location[]) => {
              this.locationList = updatedLocations;
            }
          );
        })
        .add(() => {
          this.cleanAnimations()
        })
    }, 300)
  }

  shrinkCards() {
    const elements = document.querySelectorAll(".location-card")

    elements.forEach((element) => {
      element.classList.remove("animate-grow")
      element.classList.add("animate-shrink")
    })
  }

  cleanAnimations() {
    const elements = document.querySelectorAll(".location-card")

    elements.forEach((element) => {
      element.classList.remove("opacity-0")
      element.classList.remove("scale-0")
      element.classList.remove("animate-grow")
    })
  }

  getPageNumberFromUrl(url: string): number {
    const pageNumber = url.split("page=")[1]
    return parseInt(pageNumber)
  }

  getLocationResidents(residents: string[]): void {}
}
