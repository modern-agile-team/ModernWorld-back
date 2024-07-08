import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CharacterLockersRepository } from "./characterLockers.repository";
import { CharactersRepository } from "src/characters/characters.repository";
import { UsersRepository } from "src/users/users.repository";
import { GetUserCharactersDto } from "./dtos/get-user-characters.dto";
import { CharacterNoDto } from "./dtos/character-no.dto";

@Injectable()
export class CharacterLockersService {
  constructor(
    private readonly characterLockerRepository: CharacterLockersRepository,
    private readonly charactersRepository: CharactersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  getUserAllCharacters(userNo: number, query: GetUserCharactersDto) {
    const { status, species } = query;

    return this.characterLockerRepository.getUserAllCharacters(
      userNo,
      species,
      status,
    );
  }

  async createUserOneCharacter(userNo: number, body: CharacterNoDto) {
    /**
     * 유저가 캐릭터를 사는 로직
     *
     * 0. 유저가 처음 캐릭터가 아예 없는지 확인(뉴비일경우)
     *
     * 0-1. 1~4 번 사이의 캐릭터는 공짜로 얻게끔 하기
     *
     * 0-2 해당 캐릭터 바로 사용하게끔 하기
     *
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
    const { characterNo } = body;

    if (
      !(await this.characterLockerRepository.getUserAllCharacters(userNo))[0]
    ) {
      if (characterNo > 4) {
        throw new ForbiddenException(
          "Newbies can only select characters that are 4 or less.",
        );
      }

      return this.characterLockerRepository.createOneCharacter(
        userNo,
        characterNo,
        true,
      );
    }

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

    // 트랜잭션
    this.usersRepository.updateUserCurrentPoint(userNo, -character.price);

    return this.characterLockerRepository.createOneCharacter(
      userNo,
      characterNo,
    );
  }

  async updateCharacterStatus(userNo: number, param: CharacterNoDto) {
    const { characterNo } = param;

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
      character.no,
    );
  }
}
