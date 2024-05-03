import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";
import { UserRepository } from "src/users/users.repository";
import { CharacterLockerRepository } from "./charactersLocker.repository";

@Injectable()
export class CharactersService {
  constructor(
    private readonly charactersRepository: CharactersRepository,
    private readonly userRepository: UserRepository,
    private readonly characterLocker: CharacterLockerRepository,
  ) {}

  async getCharactersBySpeices(species: string) {
    const result =
      await this.charactersRepository.getChraractersBySpecies(species);

    return result;
  }

  async buyOneCharacter(userNo: number, characterNo: number) {
    /**
     * 유저가 캐릭터를 사는 로직
     * 1. 해당번호의 캐릭터가 캐릭터 테이블에 실제로 존재하는지 확인
     *
     * 2. 이미 가지고 있는지 확인
     *
     * 3. 유저가 캐릭터를 살만큼 충분한 포인트를 가지고 있는지 확인
     *
     * 4. 캐릭터 보관함에 캐릭터추가
     *
     * 5. 유저 포인트 감소
     */

    const character =
      await this.charactersRepository.getOneCharacter(characterNo);

    if (!character) {
      throw new NotFoundException("There is no such character.");
    }

    const isThereCharacter =
      await this.characterLocker.findOneCharacterFromInventory(
        userNo,
        characterNo,
      );

    if (isThereCharacter) {
      throw new ForbiddenException("User already has this character");
    }

    const { currentPoint } = await this.userRepository.findUserPoint(userNo);

    if (currentPoint < character.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    await this.characterLocker.addOneCharacter(userNo, characterNo);

    await this.userRepository.modifyUserCurrentPoint(userNo, -character.price);

    return true;
  }

  async getOneCharacter(characterNo: number) {
    const character =
      await this.charactersRepository.getOneCharacter(characterNo);

    return character;
  }

  async useCharacterUnuseOhers(userNo: number, characterNo: number) {
    const character = await this.characterLocker.findOneCharacterFromInventory(
      userNo,
      characterNo,
    );

    if (!character) {
      throw new NotFoundException("user doesn't have that character.");
    }

    const result = await this.characterLocker.useOneCharacter(
      userNo,
      characterNo,
    );

    await this.characterLocker.unUseOtherCharacters(userNo, characterNo);

    return result;
  }
}
