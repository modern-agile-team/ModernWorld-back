import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { NeighborsRepository } from "./neighbors.repository";
import { UsersRepository } from "src/users/users.repository";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";
import { NeighborsPaginationDto } from "./dtos/neighbors-pagination.dto";

@Injectable()
export class NeighborsService {
  constructor(
    private readonly neighborsRepository: NeighborsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async createNeighbor(senderNo: number, receiverNo: number) {
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

    if (!neighbor) {
      throw new NotFoundException("Non-existent neighbor request.");
    }

    if (neighbor.receiverNo !== userNo) {
      throw new ForbiddenException(
        "This is not a neighbor request you received.",
      );
    }

    if (neighbor.status) {
      throw new ConflictException(
        "This is a neighbor request that has already been approved.",
      );
    }

    return this.neighborsRepository.updateNeighbor(neighborNo, status);
  }

  async getMyNeighborRequests(userNo: number, query: NeighborsPaginationDto) {
    const { page, take, orderBy, type } = query;

    let where = type
      ? {
          [type]: userNo,
          status: false,
        }
      : {
          OR: [{ receiverNo: userNo }, { senderNo: userNo }],
          status: false,
        };

    const skip = (page - 1) * take;
    const totalCount =
      await this.neighborsRepository.countNeighborRequestByUserNo(where);
    const totalPage = Math.ceil(totalCount / take);

    const neighborRequest =
      await this.neighborsRepository.getMyNeighborRequests(
        userNo,
        skip,
        take,
        orderBy,
        where,
      );
    return new PaginationResponseDto(neighborRequest, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }

  async getMyNeighbors(userNo: number, query: NeighborsPaginationDto) {
    const { page, take, orderBy, type } = query;
    const skip = (page - 1) * take;
    const totalCount = await this.neighborsRepository.countNeighbor(userNo);
    const totalPage = Math.ceil(totalCount / take);

    const neighbor = await this.neighborsRepository.getMyNeighbors(
      userNo,
      skip,
      take,
      orderBy,
    );
    return new PaginationResponseDto(neighbor, {
      page,
      take,
      totalCount,
      totalPage,
    });
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
