export class CreateTicketDto {
    classId: number;
    branchId: number;
    name: string;
    type: 'count' | 'period';
    availableCount?: number;
    expirationDate: Date;
    maxParticipants: number;
    price: number;
    weeklyUseLimit?: number;
    monthlyUseLimit?: number;
    reservationChangeLimit: number;
    availableTimes?: string[];
  }