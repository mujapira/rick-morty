import { ApplicationConfig } from "@angular/core"
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from "@angular/router"

import { routes } from "./app.routes"
import { provideClientHydration } from "@angular/platform-browser"
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from "@angular/common/http"
import { provideAnimations } from "@angular/platform-browser/animations"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
  ],
}
