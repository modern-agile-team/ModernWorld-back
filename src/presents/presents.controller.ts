import {
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";
import { AcceptReject } from "./enum/present-status-enum";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("presents")
@ApiTags("Presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("all")
  @ApiOperation({
    summary: "유저와 연관된 모든 선물 가져오기 API (발신, 수신 포함)",
  })
  getPresents() {
    console.log(`Get /users/presents/all`);

    const userNo = 1;

    return this.presentsService.getPresents(userNo);
  }

  @Get(":presentNo")
  @ApiOperation({ summary: "특정 선물 가져오기 API" })
  getOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Get /users/presents/:${presentNo}`);
    const userNo = 1;

    return this.presentsService.getOnePresent(userNo, presentNo);
  }

  @Post(":presentNo/user/:userNo")
  @ApiOperation({ summary: "특정 선물 추가 API" })
  presentOneItem(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Param("userNo", ParseIntPipe) receiverNo: number,
  ) {
    console.log(`Post /presents/:${presentNo}/users/:${receiverNo}`);

    const userNo = 1;
  }

  @Patch(":presentNo")
  @ApiOperation({ summary: "특정 선물 수락/거절 API" })
  updatePresentStatus(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query("acceptReject", new ParseEnumPipe(AcceptReject))
    acceptReject: AcceptReject,
  ) {
    const userNo = 1;

    return this.presentsService.acceptOrRejectOnePresent(
      userNo,
      presentNo,
      acceptReject,
    );
  }

  @Delete(":presentNo")
  @ApiOperation({ summary: "특정 선물 발신/수신 기준 제거 API" })
  deleteOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Delete /users/presents/:${presentNo}`);

    const userNo = 1;

    return this.presentsService.updateOnePresentTodelete(userNo, presentNo);
  }
}
