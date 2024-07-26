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
    const user = await this.userRepository.findUserByUserNo(receiverNo);
    if (!user) {
      throw new NotFoundException(
        "Can't find anyone to receive neighbor requests.",
      );
    }

    const existNeighborRequest =
      await this.neighborsRepository.getOneNeighborRequest(
        receiverNo,
        senderNo,
      );

    if (existNeighborRequest) {
      throw new ConflictException(
        "You have already sent a neighbor request to this user.",
      );
    }

    const existRequestAndOpponentRequestOneMore =
      await this.neighborsRepository.getOneNeighborRequest(
        senderNo,
        receiverNo,
      );

    if (existRequestAndOpponentRequestOneMore) {
      return this.neighborsRepository.updateNeighbor(
        existRequestAndOpponentRequestOneMore.no,
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

  async getMyNeighbors(userNo: number, query: NeighborsPaginationDto) {
    const { page, take, orderBy, status, type } = query;

    const where =
      type && !status
        ? {
            [type]: userNo,
            status,
          }
        : {
            OR: [{ receiverNo: userNo }, { senderNo: userNo }],
            status,
          };

    const skip = (page - 1) * take;
    const totalCount = await this.neighborsRepository.countNeighbor(where);
    const totalPage = Math.ceil(totalCount / take);

    const neighbors = await this.neighborsRepository.getMyNeighbors(
      skip,
      take,
      orderBy,
      where,
    );

    const fillteredNeighbors = neighbors.map((neighbor) => {
      if (neighbor.neighborSenderNo.no === userNo) {
        {
          const { neighborSenderNo, ...fitteredNeighbor } = neighbor;
          return fitteredNeighbor;
        }
      } else if (neighbor.neighborReceiverNo.no === userNo) {
        const { neighborReceiverNo, ...fitteredNeighbor } = neighbor;
        return fitteredNeighbor;
      }
    });

    return new PaginationResponseDto(fillteredNeighbors, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }

  async deleteNeighborRelationAndRequest(neighborNo: number, userNo: number) {
    const neighbor = await this.neighborsRepository.getOneNeighbor(neighborNo);
    if (!neighbor) {
      throw new NotFoundException("No neighbor found");
    }
    if (neighbor.receiverNo !== userNo && neighbor.senderNo !== userNo) {
      throw new ForbiddenException(
        "You can only delete the neighbor request you received and your neighbor.",
      );
    }
    return this.neighborsRepository.deleteNeighborRelationAndRequest(
      neighborNo,
    );
  }
}
