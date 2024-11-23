import { Module } from '@nestjs/common';
import { UtilsModule } from './common/utils/utils.module';
import { DatabaseModule } from '@src/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './modules/branch/branch.module';
import { ClassModule } from './modules/class/class.module';
import { ClassReservationModule } from './modules/class-reservation/class-reservation.module';
import { ClassTypeModule } from './modules/class-type/class-reservation.module';
import { InstructorModule } from './modules/instructor/instructor.module';
import { LockerModule } from './modules/locker/locker.module';
import { NoteModule } from './modules/note/note.module';
import { PointModule } from './modules/point/point.module';
import { PrivateClassModule } from './modules/private-class/private-class.module';
import { ProductModule } from './modules/product/product.module';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UsageHistoryModule } from './modules/usage-history/usage-history.module';

@Module({
    imports: [UtilsModule, DatabaseModule, UserModule, AuthModule, BranchModule, ClassModule, ClassReservationModule, ClassTypeModule,
        InstructorModule, LockerModule, NoteModule, PointModule, PrivateClassModule, ProductModule, ProductDetailModule, TicketModule, UsageHistoryModule
    ],
})
export class AppModule {}
