import { Character } from "./character"

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  actualCharacters?: Character[]
  created: string
}

