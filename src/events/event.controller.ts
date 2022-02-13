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
  async addEvent(
    @Body('name') eventName: string,
    @Body('description') eventDesc: string,
    @Body('slot') eventSlot: string,
    @Body('eventDate') eventDate: string,
  ) {
    const generatedId = await this.EventsService.insertEvent(
      eventName,
      eventDesc,
      eventSlot,
      eventDate,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllEvents() {
    const events = await this.EventsService.getEvents();
    return events;
  }

  @Get(':id')
  async getEvent(@Param('id') eventId: string) {
    const event = await this.EventsService.getOneEvent(eventId);
    return event;
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') eventId: string,
    @Body('name') eventName: string,
    @Body('description') eventDesc: string,
    @Body('slot') eventSlot: string,
    @Body('eventDate') eventDate: string,
  ) {
    await this.EventsService.updateEvent(
      eventId,
      eventName,
      eventDesc,
      eventSlot,
      eventDate,
    );
    return null;
  }

  @Delete(':id')
  async removeEvent(@Param('id') eventId: string) {
    await this.EventsService.deleteEvent(eventId);
    return null;
  }
}
