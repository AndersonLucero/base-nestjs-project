import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: false,
  })
  password?: string;
}
