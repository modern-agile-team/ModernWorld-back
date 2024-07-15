import { Injectable } from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";
import { GetCharactersDto } from "./dtos/get-characters.dto";

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  getCharacters(query: GetCharactersDto) {
    const { species, characterName } = query;

    return this.charactersRepository.getCharactersBySpeciesOrName(
      species,
      characterName,
    );
  }

  getOneCharacter(characterNo: number) {
    return this.charactersRepository.getOneCharacter(characterNo);
  }
}
