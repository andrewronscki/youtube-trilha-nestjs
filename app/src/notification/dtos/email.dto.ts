import { ApiProperty } from "@nestjs/swagger";

export class EmailDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
  
}