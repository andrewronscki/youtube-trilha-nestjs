import { ApiProperty } from "@nestjs/swagger";

export class PhoneDto {
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
  
}