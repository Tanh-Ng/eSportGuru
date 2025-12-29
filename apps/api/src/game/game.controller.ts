import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getAll() {
    return this.gameService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.gameService.getById(id);
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      imageUrl?: string;
      description?: string;
    },
  ) {
    return this.gameService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      imageUrl?: string;
      description?: string;
    },
  ) {
    return this.gameService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gameService.delete(id);
  }
}
x