import {
  AllCharactersAPIResponse,
  CharacterService,
} from "../../services/api/characters/character.service"
import { Component } from "@angular/core"
import { Character } from "../../services/api/models/character"
import { Router, RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
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
  matFavoriteBorderOutline
} from "@ng-icons/material-icons/outline"
import { PaginationComponent } from "../../components/pagination/pagination.component"

interface RequestInfo {
  currentPage?: number | null
  count: number
  pages: number
  next: string | null
  prev: string | null
}
@Component({
  selector: "app-characters",
  standalone: true,
  imports: [CommonModule, MatIconModule, NgIcon, RouterLink, PaginationComponent],
  templateUrl: "./characters.component.html",
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
      matFavoriteBorderOutline
    }),
  ],
})
export class CharactersComponent {
  //character-card starts with scale-0 opacity-0 and animate-grow so it can animate on next/prev page
  //clean animations removes the classes so it can animate again if needed
  characterList: Character[] = [] as Character[]
  paginationInfo: RequestInfo = {} as RequestInfo
  isNewPageLoaded: boolean = false

  constructor(private service: CharacterService, private router: Router) {}

  ngOnInit(): void {
    this.loadCharacters()
  }

  loadCharacters(): void {
    this.service
      .getAllCharacters()
      .subscribe((data: AllCharactersAPIResponse) => {
        this.characterList = data.results
        this.paginationInfo = data.info
        this.paginationInfo.currentPage = 1
      })
      .add(() => {
        this.cleanAnimations()
      })
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
        .getCharactersByUrl(url)
        .subscribe((data: AllCharactersAPIResponse) => {
          this.paginationInfo = data.info
          this.paginationInfo.currentPage = this.getPageNumberFromUrl(url)
          this.characterList = data.results
        })
        .add(() => {
          this.cleanAnimations()
        })
    }, 300)
  }

  shrinkCards() {
    const elements = document.querySelectorAll(".character-card")

    elements.forEach((element) => {
      element.classList.remove("animate-grow")
      element.classList.add("animate-shrink")
    })
  }

  cleanAnimations() {
    const elements = document.querySelectorAll(".character-card")
    const pagination = document.querySelectorAll(".pagination")

    pagination.forEach((element) => {
      element.classList.remove("opacity-0")
    })

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

  getLocationIdFromUrl(url: string): number {
    return parseInt(url.split("location/")[1])
  }
}
