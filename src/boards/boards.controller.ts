import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Get('')
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
