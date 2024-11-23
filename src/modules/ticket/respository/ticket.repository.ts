import { EntityRepository, Repository } from 'typeorm';
import { Ticket } from '../entity/ticket.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  
    async findAllTickets(): Promise<Ticket[]> {
        return this.find();
    }

    async findTicketById(id: number): Promise<Ticket> {
        return this.findOne(id);
    }

    async createTicket(ticketData): Promise<Ticket> {
        const ticket = this.create(ticketData);
        return this.save(ticket);
    }

    async updateTicket(id: number, updateData): Promise<Ticket> {
        await this.update(id, updateData);
        return this.findOne(id);
    }

    async deleteTicket(id: number): Promise<void> {
        await this.delete(id);
    }
}