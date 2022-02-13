import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { EventsService } from './event.service';

@Controller('events')
export class EventsController {
  constructor(private readonly EventsService: EventsService) {}

  @Post()
  addEvent(
    @Body('name') eventName: string,
    @Body('description') eventDesc: string,
    @Body('slot') eventSlot: string,
    @Body('eventDate') eventDate: Date,
  ) {
    const generatedId = this.EventsService.insertEvent(
      eventName,
      eventDesc,
      eventSlot,
      eventDate,
    );
    return { id: generatedId };
  }

  @Get()
  getAllEvents() {
    return this.EventsService.getEvents();
  }

  @Get(':id')
  getEvent(@Param('id') eventId: string) {
    return this.EventsService.getOneEvent(eventId);
  }

  @Patch(':id')
  updateEvent(
    @Param('id') eventId: string,
    @Body('name') eventName: string,
    @Body('description') eventDesc: string,
    @Body('slot') eventSlot: string,
    @Body('eventDate') eventDate: Date,
  ) {
    this.EventsService.updateEvent(
      eventId,
      eventName,
      eventDesc,
      eventSlot,
      eventDate,
    );
    return null;
  }

  @Delete(':id')
  removeEvent(@Param('id') eventId: string) {
    this.EventsService.deleteEvent(eventId);
    return null;
  }
}
