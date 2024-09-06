import { Transform } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

export function BooleanTransform() {
  return Transform(({ value }) => {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else {
      throw new BadRequestException("Invalid boolean value.");
    }
  });
}
