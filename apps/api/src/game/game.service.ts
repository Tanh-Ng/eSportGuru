import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Game } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }

  async getById(id: string): Promise<Game | null> {
    return this.prisma.game.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    imageUrl?: string;
    description?: string;
  }): Promise<Game> {
    return this.prisma.game.create({
      data,
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      imageUrl?: string;
      description?: string;
    },
  ): Promise<Game> {
    return this.prisma.game.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Game> {
    return this.prisma.game.delete({
      where: { id },
    });
  }
}
