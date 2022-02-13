import { EventsController } from './event.controller';
import { EventsService } from './event.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
