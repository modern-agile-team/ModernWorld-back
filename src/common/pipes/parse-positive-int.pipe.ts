import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isInteger(value) && value >= 1) {
      return value;
    }

    throw new BadRequestException(
      `Validation failed (positive int string is expected)`,
    );
  }
}
