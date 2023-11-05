import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DbModule } from '@app/common';
import { ReservationsRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    DbModule,
    DbModule.forFeature(
      [{ name: ReservationDocument.name, schema: ReservationSchema }]
    ),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true
          }
        }
      }
    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule { }
