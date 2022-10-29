import { Publisher, Subjects, CityUpdatedEvent } from '@sevenfood/common';

export class CityUpdatedPublisher extends Publisher<CityUpdatedEvent> {
  subject: Subjects.CityUpdated = Subjects.CityUpdated;
}
