import { Publisher, Subjects, CountryCreatedEvent } from '@sevenfood/common';

export class CountryCreatedPublisher extends Publisher<CountryCreatedEvent> {
  subject: Subjects.CountryCreated = Subjects.CountryCreated;
}
