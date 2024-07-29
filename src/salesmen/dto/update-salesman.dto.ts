import { PartialType } from '@nestjs/swagger';
import { CreateSalesmanDto } from './create-salesman.dto';

export class UpdateSalesmanDto {
  username: string;
  areas: string[];
}
