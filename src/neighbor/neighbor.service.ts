import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNeighborDto } from "./dto/create-neighbor.dto";
import { UpdateNeighborDto } from "./dto/update-neighbor.dto";
import { NeighborRepository } from "./neighbor.repository";

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
}
