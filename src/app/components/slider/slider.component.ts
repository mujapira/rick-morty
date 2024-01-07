import { CommonModule } from "@angular/common"
import { Component, EventEmitter, Input, NgZone, Output } from "@angular/core"

export interface CarouselItem {
  imageUrl: string | undefined
  altText: string
}

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./slider.component.html",
})
export class SliderComponent {
  constructor(private zone: NgZone) {}

  @Input() carouselItems: CarouselItem[] = []

  currentIndex = 0

  @Output() nextSlide = new EventEmitter<any>()
  @Output() prevSlide = new EventEmitter<any>()

  onPrevSlide() {
    this.zone.run(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.carouselItems.length) %
        this.carouselItems.length
      this.prevSlide.emit()
    })
  }

  onNextSlide() {
    this.zone.run(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length
      this.nextSlide.emit()
    })
  }
}
