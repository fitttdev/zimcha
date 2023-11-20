import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DbModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';

@Module({
  imports: [
    DbModule,
    DbModule.forFeature(
      [{ name: ReservationDocument.name, schema: ReservationSchema }]
    ),
   LoggerModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule { }
