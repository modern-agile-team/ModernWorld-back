import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { NeighborRepository } from "./neighbors.repository";
import { getNeighborDto } from "./dtos/get-neighbors.dto";

@Injectable()
export class NeighborService {
  constructor(private readonly neighborRepository: NeighborRepository) {}

  async neighborRequest(body: CreateNeighborDto, senderNo: number) {
    const { receiverNo } = body;

    if (receiverNo === senderNo) {
      throw new ForbiddenException(
        "이웃신청을 자기 자신에게 보낼 수 없습니다.",
      );
    }
    const existNeighborRequst =
      await this.neighborRepository.getOneNeighborRequest(receiverNo, senderNo);

    if (existNeighborRequst) {
      throw new ConflictException("이미 해당 유저에게 이웃신청을 보냈습니다.");
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
      throw new ConflictException("상대방과 이미 이웃입니다.");
    }
    return this.neighborRepository.neighborRequest(receiverNo, senderNo);
  }

  async neighborApproval(body: UpdateNeighborDto) {
    const { no, status } = body;
    const alreadyApproval = await this.neighborRepository.getOneNeighbor(no);
    if (!alreadyApproval) {
      throw new NotFoundException("존재하지 않는 이웃요청입니다.");
    }
    if (alreadyApproval.status) {
      throw new ConflictException("이미 승인 처리된 이웃요청입니다.");
    }
    return this.neighborRepository.neighborApproval(no, status);
  }

  getMyNeighbors(userNo: number, queryParams: getNeighborDto) {
    const { take, page } = queryParams;
    const skip = (page - 1) * take;
    return this.neighborRepository.getMyNeighbors(userNo, take, skip);
  }

  async neighborRequestRefusalOrDelete(neighborNo: number) {
    const NeighborNotFound =
      await this.neighborRepository.getOneNeighbor(neighborNo);
    if (!NeighborNotFound) {
      throw new NotFoundException("해당 이웃을 찾을 수 없습니다.");
    }
    return this.neighborRepository.neighborRequestRefusalOrDelete(neighborNo);
  }
}
