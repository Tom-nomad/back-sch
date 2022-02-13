export class Event {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public slot: string,
    public eventDate: Date,
  ) {}
}
