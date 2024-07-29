import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
