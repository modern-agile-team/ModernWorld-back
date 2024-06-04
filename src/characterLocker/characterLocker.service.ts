import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CharacterLockerRepository } from "./characterLocker.repository";
import { CharactersRepository } from "src/characters/characters.repository";
import { UsersRepository } from "src/users/users.repository";
import { Animal } from "src/common/enum/animal.enum";

@Injectable()
export class CharacterLockerService {
  constructor(
    private readonly characterLockerRepository: CharacterLockerRepository,
    private readonly charactersRepository: CharactersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  getUserAllCharacters(userNo: number, species: Animal, status: boolean) {
    return this.characterLockerRepository.getUserAllCharacters(
      userNo,
      species,
      status,
    );
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
     *
     * 4, 5 트랜잭션으로 묶을것...
     */

    const character =
      await this.charactersRepository.getOneCharacter(characterNo);

    if (!character) {
      throw new NotFoundException("There is no such character.");
    }

    const userCharacter =
      await this.characterLockerRepository.findUserCharacterFromInventory(
        userNo,
        characterNo,
      );

    if (userCharacter) {
      throw new ConflictException("User already has this character");
    }

    const { currentPoint } = await this.usersRepository.findUserPoint(userNo);

    if (currentPoint < character.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    await this.usersRepository.updateUserCurrentPoint(userNo, -character.price);

    return this.characterLockerRepository.addOneCharacter(userNo, characterNo);
  }

  async updateCharacterStatus(userNo: number, characterNo: number) {
    const character =
      await this.characterLockerRepository.findUserCharacterFromInventory(
        userNo,
        characterNo,
      );

    if (!character) {
      throw new NotFoundException("User doesn't have that character.");
    }

    // 트랜잭션으로 묶어놓을것.

    await this.characterLockerRepository.disuseOtherCharacters(
      userNo,
      characterNo,
    );

    return this.characterLockerRepository.updateCharacterStatusToUse(
      userNo,
      characterNo,
    );
  }
}
