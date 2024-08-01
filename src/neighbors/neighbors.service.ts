import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { NeighborsRepository } from "./neighbors.repository";
import { UsersRepository } from "src/users/users.repository";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";
import { NeighborsPaginationDto } from "./dtos/neighbors-pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { SseService } from "src/sse/sse.service";
import { AlarmsRepository } from "src/alarms/alarms.repository";

@Injectable()
export class NeighborsService {
  constructor(
    private readonly neighborsRepository: NeighborsRepository,
    private readonly userRepository: UsersRepository,
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
    private readonly sseService: SseService,
    private readonly alarmsRepository: AlarmsRepository,
  ) {}

  async createNeighbor(senderNo: number, receiverNo: number) {
    const isNeighbor = await this.neighborsRepository.checkMyNeighbor(
      receiverNo,
      senderNo,
    );

    if (isNeighbor) {
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

    const myRequest = await this.neighborsRepository.getOneNeighborRequest(
      receiverNo,
      senderNo,
    );

    if (myRequest) {
      throw new ConflictException(
        "You have already sent a neighbor request to this user.",
      );
    }

    const opponentRequest =
      await this.neighborsRepository.getOneNeighborRequest(
        senderNo,
        receiverNo,
      );

    if (opponentRequest) {
      return this.setNeighborAsTrue(senderNo, receiverNo, opponentRequest.no);
    }

    let neighbor;

    try {
      neighbor = await this.prisma.$transaction(async (tx) => {
        const result = await this.neighborsRepository.createNeighbor(
          receiverNo,
          senderNo,
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          receiverNo,
          `${result.neighborSenderNo.nickname}님에게 이웃 요청이 왔습니다.`,
          "이웃",
          tx,
        );

        return result;
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }

    this.sseService.sendSse(receiverNo, {
      title: "이웃",
      content: `${neighbor.neighborSenderNo.nickname}님에게 이웃 요청이 왔습니다.`,
    });

    return neighbor;
  }

  async updateNeighbor(neighborNo: number, userNo: number) {
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

    return this.setNeighborAsTrue(
      neighbor.senderNo,
      neighbor.receiverNo,
      neighborNo,
    );
  }

  async getMyNeighbors(userNo: number, query: NeighborsPaginationDto) {
    const { page, take, orderBy, status, type: senderReceiver } = query;

    const where =
      senderReceiver && !status
        ? {
            [senderReceiver]: userNo,
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
          const { neighborSenderNo, ...filtered } = neighbor;

          filtered["neighbor"] = filtered.neighborReceiverNo;

          delete filtered.neighborReceiverNo;

          return filtered;
        }
      } else if (neighbor.neighborReceiverNo.no === userNo) {
        const { neighborReceiverNo, ...filtered } = neighbor;

        filtered["neighbor"] = filtered.neighborSenderNo;

        delete filtered.neighborSenderNo;

        return filtered;
      }
    });

    return new PaginationResponseDto(fillteredNeighbors, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }

  async deleteNeighbor(neighborNo: number, userNo: number) {
    const neighbor = await this.neighborsRepository.getOneNeighbor(neighborNo);
    if (!neighbor) {
      throw new NotFoundException("No neighbor found");
    }
    if (neighbor.receiverNo !== userNo && neighbor.senderNo !== userNo) {
      throw new ForbiddenException(
        "You can only delete the neighbor request you received and your neighbor.",
      );
    }
    return this.neighborsRepository.deleteNeighbor(neighborNo);
  }

  private async setNeighborAsTrue(
    senderNo: number,
    receiverNo: number,
    neighborNo: number,
  ) {
    let neighbor;

    try {
      neighbor = await this.prisma.$transaction(async (tx) => {
        const result = await this.neighborsRepository.setNeighborStatusTrue(
          neighborNo,
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          receiverNo,
          `${result.neighborReceiverNo.nickname}님과 이웃이 되었습니다.`,
          "이웃",
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          senderNo,
          `${result.neighborSenderNo.nickname}님과 이웃이 되었습니다.`,
          "이웃",
          tx,
        );

        return result;
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }

    this.sseService.sendSse(receiverNo, {
      title: "이웃",
      content: `${neighbor.neighborReceiverNo.nickname}님과 이웃이 되었습니다.`,
    });

    this.sseService.sendSse(senderNo, {
      title: "이웃",
      content: `${neighbor.neighborSenderNo.nickname}님과 이웃이 되었습니다.`,
    });

    return neighbor;
  }
}
