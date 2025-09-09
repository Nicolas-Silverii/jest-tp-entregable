import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotebookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
