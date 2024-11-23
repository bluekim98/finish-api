export class UpdateTicketDto {
    name?: string;
    type?: 'count' | 'period';
    availableCount?: number;
    expirationDate?: Date;
    maxParticipants?: number;
    price?: number;
    weeklyUseLimit?: number;
    monthlyUseLimit?: number;
    reservationChangeLimit?: number;
    availableTimes?: string[];
  }