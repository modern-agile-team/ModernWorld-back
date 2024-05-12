import { Injectable } from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  getCharactersBySpeices(species?: string): Promise<object> {
    return this.charactersRepository.getCharactersBySpecies(species);
  }

  getOneCharacter(characterNo: number): Promise<object> {
    return this.charactersRepository.getOneCharacter(characterNo);
  }
}
