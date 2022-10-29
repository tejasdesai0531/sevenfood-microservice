import { Publisher, Subjects, CuisineUpdatedEvent } from '@sevenfood/common';

export class CuisineUpdatedPublisher extends Publisher<CuisineUpdatedEvent> {
  subject: Subjects.CuisineUpdated = Subjects.CuisineUpdated;
}
