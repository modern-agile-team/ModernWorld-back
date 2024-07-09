import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { NeighborRepository } from "./neighbors.repository";
import { getNeighborDto } from "./dtos/get-neighbors.dto";

@Injectable()
export class NeighborService {
  constructor(private readonly neighborRepository: NeighborRepository) {}

  neighborRequest(body: CreateNeighborDto, senderNo: number) {
    const { receiverNo, status } = body;

    if (receiverNo === senderNo) {
      throw new BadRequestException(
        "본인이 본인에게 친구 신청을 보낼 수 없습니다.",
      );
    }
    return this.neighborRepository.neighborRequest(
      receiverNo,
      senderNo,
      status,
    );
  }

  neighborApproval(body: UpdateNeighborDto) {
    const { no, status } = body;
    return this.neighborRepository.neighborApproval(no, status);
  }

  getMyNeighbors(receiverNo: number, queryParams: getNeighborDto) {
    const { take, page } = queryParams;
    const skip = (page - 1) * take;
    return this.neighborRepository.getMyNeighbors(receiverNo, take, skip);
  }

  neighborRequestRefusalOrDelete(neighboeNo: number) {
    return this.neighborRepository.neighborRequestRefusalOrDelete(neighboeNo);
  }
}
