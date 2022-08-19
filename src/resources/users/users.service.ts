import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
