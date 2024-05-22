import { Injectable } from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";
import { GetCharactersDto } from "./dtos/get-characters.dto";

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  getCharacters(queryParmas: GetCharactersDto): Promise<object> {
    const { species, characterName } = queryParmas;

    return this.charactersRepository.getCharactersBySpeciesOrName(
      species,
      characterName,
    );
  }

  getOneCharacter(characterNo: number): Promise<object> {
    return this.charactersRepository.getOneCharacter(characterNo);
  }
}
