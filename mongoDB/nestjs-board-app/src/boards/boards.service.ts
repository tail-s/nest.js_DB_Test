import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.schema';
import { User } from 'src/auth/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { unlink } from 'fs/promises';
import { Response } from 'express';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private boardModel: Model<Board>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardModel.find();
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
    file: Express.Multer.File,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const attachment = file ? file.path : '';
    const originalFilename = file
      ? Buffer.from(file.originalname, 'latin1').toString('utf8')
      : '';

    const board = new this.boardModel({
      title,
      description,
      status: BoardStatus.PUBLIC,
      writer: user.username,
      user: user._id,
      attachment,
      originalFilename,
    });

    user.boards.push(board);
    await this.userModel.findByIdAndUpdate(user._id, user);

    await board.save();
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardModel.findById(id).exec();

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const boardToDelete = await this.boardModel.findOne({
      _id: id,
      user: user._id,
    });

    if (!boardToDelete) {
      throw new NotFoundException(`You are not allowed`);
    }

    const result = await this.boardModel.deleteOne({ _id: id });

    const boardIndex = user.boards.indexOf(boardToDelete._id);
    if (boardIndex > -1) {
      user.boards.splice(boardIndex, 1);
      await this.userModel.findByIdAndUpdate(user._id, user);

      if (boardToDelete.attachment) {
        try {
          await unlink(boardToDelete.attachment);
        } catch (err) {
          console.error(`Eror deleting file : ${err}`);
        }
      }
    }

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardModel.findById(id).exec();

    board.status = status;
    await board.save();

    return board;
  }

  async updateBoard(
    id: string,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const board = await this.boardModel.findById(id).exec();

    board.title = createBoardDto.title;
    board.description = createBoardDto.description;
    await board.save();

    return board;
  }

  async getMyAllBoards(user: User): Promise<Board[]> {
    const boards = await this.boardModel.find({ userId: user.id }).exec();
    return boards;
  }

  async downloadFile(id: string, res: Response): Promise<void> {
    const board = await this.boardModel.findById(id).exec();

    if (!board || !board.attachment) {
      throw new NotFoundException('File not found');
    }

    res.download(board.attachment, board.originalFilename);
  }
}
