import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { SliderComponent } from "../../components/slider/slider.component"
import { FormsModule } from "@angular/forms"

interface Product {
  availableQuantity: number
  availableSizes: string[]
  originalPrice: number
  discount: number
  productMainImageUrl?: string
  productMainImagePath?: string
  productSecondaryImagesUrls?: string[]
  productSecondaryImagesPaths?: string[]
}

@Component({
  selector: "app-plumbus",
  standalone: true,
  imports: [CommonModule, SliderComponent, FormsModule],
  templateUrl: "./plumbus.component.html",
})
export class PlumbusComponent {
  product: Product = {
    availableQuantity: 20,
    availableSizes: ["sm", "md", "lg", "xl"],
    originalPrice: 120.9,
    discount: 45,
    productMainImagePath: "../../../assets/plumbus.png",
  } as Product

  currentPrice =
    this.product.originalPrice -
    (this.product.originalPrice * this.product.discount) / 100
  selectedQuantity: number = 0
  selectedSize: string = ""

  carouselItems = [
    {
      imageUrl: this.product.productMainImagePath,
      altText: "Plumbus",
    },
  ]

  decreaseQuantity() {
    if (this.selectedQuantity >= 1) {
      this.selectedQuantity--
    }
  }

  increaseQuantity() {
    this.selectedQuantity++
  }

  addToCart() {
    console.log("Cart")
  }

  buyNow() {
    console.log("Buy")
  }
}
