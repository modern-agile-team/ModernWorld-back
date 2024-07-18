import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { NeighborsRepository } from "./neighbors.repository";
import { getNeighborDto } from "./dtos/get-neighbors.dto";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class NeighborsService {
  constructor(
    private readonly neighborsRepository: NeighborsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async createNeighbor(body: CreateNeighborDto, senderNo: number) {
    const { receiverNo } = body;

    const checkMyNeighbor = await this.neighborsRepository.checkMyNeighbor(
      receiverNo,
      senderNo,
    );
    if (checkMyNeighbor) {
      throw new ConflictException("The other person is already neighbors.");
    }

    if (receiverNo === senderNo) {
      throw new ForbiddenException("Users cannot neighbor themselves alone.");
    }
    const user = await this.userRepository.findUserNicknameByUserNo(receiverNo);
    if (!user) {
      throw new NotFoundException(
        "Can't find anyone to receive neighbor requests.",
      );
    }

    const existNeighborRequst =
      await this.neighborsRepository.getOneNeighborRequest(
        receiverNo,
        senderNo,
      );

    if (existNeighborRequst) {
      throw new ConflictException(
        "You have already sent a neighbor request to this user.",
      );
    }

    const existRequestAndOpponentRequstOneMore =
      await this.neighborsRepository.getOneNeighborRequest(
        senderNo,
        receiverNo,
      );

    if (existRequestAndOpponentRequstOneMore) {
      return this.neighborsRepository.updateNeighbor(
        existRequestAndOpponentRequstOneMore.no,
        true,
      );
    }

    return this.neighborsRepository.createNeighbor(receiverNo, senderNo);
  }

  async updateNeighbor(
    neighborNo: number,
    userNo: number,
    body: UpdateNeighborDto,
  ) {
    const { status } = body;
    const neighbor = await this.neighborsRepository.getOneNeighbor(neighborNo);

    if (neighbor.receiverNo !== userNo) {
      throw new ForbiddenException(
        "This is not a neighbor request you received.",
      );
    }
    if (!neighbor) {
      throw new NotFoundException("Non-existent neighbor request.");
    }
    if (neighbor.status) {
      throw new ConflictException(
        "This is a neighbor request that has already been approved.",
      );
    }

    return this.neighborsRepository.updateNeighbor(neighborNo, status);
  }

  getMyNeighbors(userNo: number, queryParams: getNeighborDto) {
    const { take, page } = queryParams;
    const skip = (page - 1) * take;
    return this.neighborsRepository.getMyNeighbors(userNo, take, skip);
  }

  async rejectNeighborRequestOrDeleteNeighbor(
    neighborNo: number,
    userNo: number,
  ) {
    const neighbor = await this.neighborsRepository.getOneNeighbor(neighborNo);
    if (!neighbor) {
      throw new NotFoundException("No neighbor found");
    }
    if (neighbor.receiverNo !== userNo && neighbor.senderNo !== userNo) {
      throw new ForbiddenException(
        "You can only delete the neighbor request you received and your neighbor.",
      );
    }
    return this.neighborsRepository.rejectNeighborRequestOrDeleteNeighbor(
      neighborNo,
    );
  }
}
