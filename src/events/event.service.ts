import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}
  async insertEvent(
    title: string,
    start: Date,
    end: Date,
    description: string,
    color: string,
  ) {
    const newEvent = new this.eventModel({
      title,
      start,
      end,
      description,
      color,
    });
    const result = await newEvent.save();
    return result.id as string;
  }

  async getEvents() {
    const events = await this.eventModel.find();
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      color: event.color,
    }));
  }

  async getOneEvent(eventId: string) {
    const event = await this.findEvent(eventId);
    return {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      color: event.color,
    };
  }

  async updateEvent(
    eventId: string,
    title: string,
    start: Date,
    end: Date,
    description: string,
    color: string,
  ) {
    const updatedEvent = await this.findEvent(eventId);
    if (title) {
      updatedEvent.title = title;
    }
    if (start) {
      updatedEvent.start = start;
    }
    if (end) {
      updatedEvent.end = end;
    }
    if (description) {
      updatedEvent.description = description;
    }
    if (color) {
      updatedEvent.color = color;
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
