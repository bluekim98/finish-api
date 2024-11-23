import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRepository } from './ticket.repository';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketRepository)
        private readonly ticketRepository: TicketRepository,
    ) {}

    async create(createTicketDto: CreateTicketDto) {
        return this.ticketRepository.createTicket(createTicketDto);
    }

    async findAll() {
        return this.ticketRepository.findAllTickets();
    }

    async findOne(id: number) {
        const ticket = await this.ticketRepository.findTicketById(id);
        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }

    async update(id: number, updateTicketDto: UpdateTicketDto) {
        const ticket = await this.ticketRepository.updateTicket(id, updateTicketDto);
        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }

    async remove(id: number) {
        const result = await this.ticketRepository.deleteTicket(id);
        if (!result) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
    }
}