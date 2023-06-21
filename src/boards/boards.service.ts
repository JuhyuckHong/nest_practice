import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
    constructor(private readonly boardRepository: BoardRepository) {}

    // created board
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    // get by id
    getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

    // get all boards
    getAllBoards(): Promise<Board[]> {
        return this.boardRepository.getAllBoards();
    }

    // delete by id
    async deleteBoard(id: number): Promise<void> {
        await this.boardRepository.deleteById(id);
    }

    // update board status
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        return this.boardRepository.updateBoardStatus(id, status);
    }
}
