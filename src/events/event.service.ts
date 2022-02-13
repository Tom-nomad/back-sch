import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class EventsService {
  private events: Event[] = [];
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}
  async insertEvent(
    name: string,
    description: string,
    slot: string,
    eventDate: string,
  ) {
    const newEvent = new this.eventModel({
      name,
      description,
      slot,
      eventDate,
    });
    const result = await newEvent.save();
    return result.id as string;
  }

  async getEvents() {
    const events = await this.eventModel.find();
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      slot: event.slot,
      eventDate: event.eventDate,
    }));
  }

  async getOneEvent(eventId: string) {
    const event = await this.findEvent(eventId);
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      slot: event.slot,
      eventDate: event.eventDate,
    };
  }

  async updateEvent(
    eventId: string,
    name: string,
    description: string,
    slot: string,
    eventDate: string,
  ) {
    const updatedEvent = await this.findEvent(eventId);
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
    updatedEvent.save();
  }

  async deleteEvent(eventId: string) {
    const eventToDelete = await this.eventModel.deleteOne({ _id: eventId });
    if (eventToDelete.deletedCount === 0) {
      throw new NotFoundException('Could not find this event.');
    }
  }

  private async findEvent(id: string): Promise<Event> {
    let event;
    try {
      event = await this.eventModel.findOne({ _id: id });
    } catch (error) {
      throw new NotFoundException('Could not find this event.');
    }
    if (!event) {
      throw new NotFoundException('Could not find this event.');
    }
    return event;
  }
}
