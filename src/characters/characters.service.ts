import { Injectable } from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async getCharactersBySpeices(species?: string): Promise<object> {
    return this.charactersRepository.getCharactersBySpecies(species);
  }

  async getOneCharacter(characterNo: number): Promise<object> {
    return await this.charactersRepository.getOneCharacter(characterNo);
  }
}
