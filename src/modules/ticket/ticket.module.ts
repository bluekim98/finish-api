// ticket.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './service/ticket.service';
import { Ticket } from './entity/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}