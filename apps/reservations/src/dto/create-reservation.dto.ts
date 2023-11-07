import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @Type(() => String)
  placeID: string;

  @IsString()
  @Type(() => String)
  invoiceID: string;
}
