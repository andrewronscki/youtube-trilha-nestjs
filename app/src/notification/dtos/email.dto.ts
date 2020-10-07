import { ApiProperty } from "@nestjs/swagger";

export class EmailDto {
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
  
}