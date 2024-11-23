import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entity/note.entity';
import { CreateNoteDto, UpdateNoteDto } from '../dto/note.dto';

@Injectable()
export class NoteService {
  
  constructor(
      @InjectRepository(Note)
      private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
      const note = this.noteRepository.create(createNoteDto);
      return this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
      return this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
      const note = await this.noteRepository.findOne({ where : { id } });
      if (!note) {
          throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
      const note = await this.findOne(id);
      Object.assign(note, updateNoteDto);
      return this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
      const result = await this.noteRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Note with ID ${id} not found`);
      }
  }
}