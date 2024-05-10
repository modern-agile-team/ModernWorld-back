import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CharactersRepository } from "./characters.repository";
import { UsersRepository } from "src/users/users.repository";
import { CharacterLockerRepository } from "../character-locker/charactersLocker.repository";

@Injectable()
export class CharactersService {
  constructor(
    private readonly charactersRepository: CharactersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly characterLockerRepository: CharacterLockerRepository,
  ) {}

  async getCharactersBySpeices(species?: string): Promise<object> {
    return this.charactersRepository.getCharactersBySpecies(species);
  }

  async buyOneCharacter(userNo: number, characterNo: number): Promise<boolean> {
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
     *
     * 4, 5 트랜잭션으로 묶을것...
     */

    const character =
      await this.charactersRepository.getOneCharacter(characterNo);

    if (!character) {
      throw new NotFoundException("There is no such character.");
    }

    const userCharacter =
      await this.characterLockerRepository.findOneCharacterFromInventory(
        userNo,
        characterNo,
      );

    if (userCharacter) {
      throw new ForbiddenException("User already has this character");
    }

    const { currentPoint } = await this.usersRepository.findUserPoint(userNo);

    if (currentPoint < character.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    await this.characterLockerRepository.addOneCharacter(userNo, characterNo);

    await this.usersRepository.updateUserCurrentPoint(userNo, -character.price);

    return true;
  }

  async getOneCharacter(characterNo: number): Promise<object> {
    return await this.charactersRepository.getOneCharacter(characterNo);
  }

  async useCharacterDisuseOthers(
    userNo: number,
    characterNo: number,
  ): Promise<object> {
    const character =
      await this.characterLockerRepository.findOneCharacterFromInventory(
        userNo,
        characterNo,
      );

    if (!character) {
      throw new NotFoundException("User doesn't have that character.");
    }

    // 트랜잭션으로 묶어놓을것.
    const result = await this.characterLockerRepository.updateCharacterStatus(
      userNo,
      characterNo,
    );

    await this.characterLockerRepository.disuseOtherCharacters(
      userNo,
      characterNo,
    );

    return result;
  }
}
