import { Publisher, Subjects, CountryUpdatedEvent } from '@sevenfood/common';

export class CountryUpdatedPublisher extends Publisher<CountryUpdatedEvent> {
  subject: Subjects.CountryUpdated = Subjects.CountryUpdated;
}
