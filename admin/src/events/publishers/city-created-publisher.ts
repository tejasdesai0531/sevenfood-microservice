import { Publisher, Subjects, CityCreatedEvent } from '@sevenfood/common';

export class CityCreatedPublisher extends Publisher<CityCreatedEvent> {
  subject: Subjects.CityCreated = Subjects.CityCreated;
}
