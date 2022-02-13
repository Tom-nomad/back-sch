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
    @Body('title') eventTitle: string,
    @Body('start') eventStart: Date,
    @Body('end') eventEnd: Date,
    @Body('description') eventDesc: string,
    @Body('color') eventColor: string,
  ) {
    const generatedId = await this.EventsService.insertEvent(
      eventTitle,
      eventStart,
      eventEnd,
      eventDesc,
      eventColor,
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
    @Body('title') eventTitle: string,
    @Body('start') eventStart: Date,
    @Body('end') eventEnd: Date,
    @Body('end') eventDesc: string,
    @Body('end') eventColor: string,
  ) {
    await this.EventsService.updateEvent(
      eventId,
      eventTitle,
      eventStart,
      eventEnd,
      eventDesc,
      eventColor,
    );
    return null;
  }

  @Delete(':id')
  async removeEvent(@Param('id') eventId: string) {
    await this.EventsService.deleteEvent(eventId);
    return null;
  }
}
