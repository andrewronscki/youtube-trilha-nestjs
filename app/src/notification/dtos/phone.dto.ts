import { ApiProperty } from "@nestjs/swagger";

export class PhoneDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
  
}