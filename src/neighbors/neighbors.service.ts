import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { NeighborRepository } from "./neighbors.repository";
import { getNeighborDto } from "./dtos/get-neighbors.dto";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class NeighborService {
  constructor(
    private readonly neighborRepository: NeighborRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async neighborRequest(body: CreateNeighborDto, senderNo: number) {
    const { receiverNo } = body;

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
      await this.neighborRepository.getOneNeighborRequest(receiverNo, senderNo);

    if (existNeighborRequst) {
      throw new ConflictException(
        "You have already sent a neighbor request to this user.",
      );
    }

    const existRequestAndOpponentRequstOneMore = // 이미 이웃요청을 보냈는데 상대방이 친구 요청을 보냈을 때 변수명은 수정이 필요할 듯
      await this.neighborRepository.getOneNeighborRequest(senderNo, receiverNo);

    if (existRequestAndOpponentRequstOneMore) {
      existRequestAndOpponentRequstOneMore.status = true; // 상태를 승인으로 바꿔준 다음 승인 함
      return this.neighborRepository.neighborApproval(
        existRequestAndOpponentRequstOneMore.no,
        existRequestAndOpponentRequstOneMore.status,
      );
    }

    const checkMyNeighbor = await this.neighborRepository.checkMyNeighbor(
      receiverNo,
      senderNo,
    );
    if (checkMyNeighbor) {
      throw new ConflictException("The other person are already neighbors.");
    }
    return this.neighborRepository.neighborRequest(receiverNo, senderNo);
  }

  async neighborApproval(
    neighborNo: number,
    userNo: number,
    body: UpdateNeighborDto,
  ) {
    const { status } = body;
    const alreadyApproval =
      await this.neighborRepository.getOneNeighbor(neighborNo);

    if (alreadyApproval.receiverNo !== userNo) {
      throw new ForbiddenException(
        "This is not a neighbor request you received.",
      );
    }
    if (!alreadyApproval) {
      throw new NotFoundException("Non-existent neighbor request.");
    }
    if (alreadyApproval.status) {
      throw new ConflictException(
        "This is a neighbor request that has already been approved.",
      );
    }

    return this.neighborRepository.neighborApproval(neighborNo, status);
  }

  getMyNeighbors(userNo: number, queryParams: getNeighborDto) {
    const { take, page } = queryParams;
    const skip = (page - 1) * take;
    return this.neighborRepository.getMyNeighbors(userNo, take, skip);
  }

  async neighborRequestRefusalOrDelete(neighborNo: number, userNo: number) {
    const NeighborNotFound =
      await this.neighborRepository.getOneNeighbor(neighborNo);
    if (!NeighborNotFound) {
      throw new NotFoundException("No neighbor found");
    }
    if (
      NeighborNotFound.receiverNo !== userNo &&
      NeighborNotFound.senderNo !== userNo
    ) {
      throw new ForbiddenException(
        "You can only delete the neighbor request you received and your neighbor.",
      );
    }
    return this.neighborRepository.neighborRequestRefusalOrDelete(neighborNo);
  }
}
