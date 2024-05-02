import { Injectable } from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async getCharactersBySpeices(species: string) {
    const result =
      await this.charactersRepository.getChraractersBySpecies(species);

    return result;
  }
}
