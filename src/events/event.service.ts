import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Event } from './event.model';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  insertEvent(
    name: string,
    description: string,
    slot: string,
    eventDate: Date,
  ) {
    const eventId = randomUUID();
    const newEvent = new Event(eventId, name, description, slot, eventDate);
    this.events.push(newEvent);
    return eventId;
  }

  getEvents() {
    return [...this.events];
  }

  getOneEvent(eventId: string) {
    const event = this.findEvent(eventId)[0];
    return { ...event };
  }

  updateEvent(
    eventId: string,
    name: string,
    description: string,
    slot: string,
    eventDate: Date,
  ) {
    const [event, index] = this.findEvent(eventId);
    const updatedEvent = { ...event };
    if (name) {
      updatedEvent.name = name;
    }
    if (description) {
      updatedEvent.description = description;
    }
    if (slot) {
      updatedEvent.slot = slot;
    }
    if (eventDate) {
      updatedEvent.eventDate = eventDate;
    }
    this.events[index] = updatedEvent;
  }

  deleteEvent(eventId: string) {
    const index = this.findEvent(eventId)[1];
    this.events.splice(index, 1);
  }

  private findEvent(id: string): [Event, number] {
    const eventIndex = this.events.findIndex((event) => event.id === id);
    const event = this.events[eventIndex];
    if (!event) {
      throw new NotFoundException('Could not find this event.');
    }
    return [event, eventIndex];
  }
}
