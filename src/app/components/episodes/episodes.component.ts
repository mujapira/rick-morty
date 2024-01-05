import { Component } from "@angular/core"
import { Episode } from "../../services/api/models/episode"
import {
  AllEpisodesAPIResponse,
  EpisodeService,
  RequestPaginationInfo,
} from "../../services/api/episodes/episode.service"
import { Router, RouterLink } from "@angular/router"
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
  matSlideshowOutline,
} from "@ng-icons/material-icons/outline"
import { NgIcon, provideIcons } from "@ng-icons/core"
import { CommonModule } from "@angular/common"
import { forkJoin, map } from "rxjs"
import { Character } from "../../services/api/models/character"
import { PaginationComponent } from "../pagination/pagination.component"
@Component({
  selector: "app-episodes",
  standalone: true,
  imports: [NgIcon, CommonModule, RouterLink, PaginationComponent],
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
      matSlideshowOutline,
    }),
  ],
  templateUrl: "./episodes.component.html",
})
export class EpisodesComponent {
  episodeList: Episode[] = [] as Episode[]
  paginationInfo: RequestPaginationInfo = {} as RequestPaginationInfo

  constructor(private service: EpisodeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEpisodes()
  }

  loadEpisodes(): void {
    this.service
      .getAllEpisodes()
      .subscribe((allEpisodeData: AllEpisodesAPIResponse) => {
        this.paginationInfo = allEpisodeData.info
        this.paginationInfo.currentPage = 1

        forkJoin(
          allEpisodeData.results.map((episode) =>
            this.service.getEpisodeCharacters(episode.characters).pipe(
              map((residentsData: Character[]) => ({
                ...episode,
                actualCharacters: residentsData,
              }))
            )
          )
        ).subscribe((updatedEpisodes: Episode[]) => {
          this.episodeList = updatedEpisodes
        })
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
        .getEpisodesByUrl(url)
        .subscribe((allEpisodeData: AllEpisodesAPIResponse) => {
          this.paginationInfo = allEpisodeData.info
          this.paginationInfo.currentPage = 1
          this.paginationInfo.currentPage = this.getPageNumberFromUrl(url)
          
          forkJoin(
            allEpisodeData.results.map((episode) =>
              this.service.getEpisodeCharacters(episode.characters).pipe(
                map((residentsData: Character[]) => ({
                  ...episode,
                  actualCharacters: residentsData,
                }))
              )
            )
          ).subscribe((updatedEpisodes: Episode[]) => {
            this.episodeList = updatedEpisodes
          })
        })
        .add(() => {
          this.cleanAnimations()
        })
    }, 300)
  }

  shrinkCards() {
    const elements = document.querySelectorAll(".episode-card")

    elements.forEach((element) => {
      element.classList.remove("animate-grow")
      element.classList.add("animate-shrink")
    })
  }

  cleanAnimations() {
    const elements = document.querySelectorAll(".episode-card")

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

  transformEpisodeAndSeason(input: string): string {
    const regex = /^S(\d+)E(\d+)$/

    const match = input.match(regex)

    if (match) {
      const season = match[1]
      const episode = match[2]
      return `Season ${this.padWithZeroes(
        season
      )} - Episode ${this.padWithZeroes(episode)}`
    } else {
      return input
    }
  }

  padWithZeroes(number: string): string {
    return number.padStart(2, "0")
  }
}
