import { Publisher, Subjects, CuisineCreatedEvent } from '@sevenfood/common';

export class CuisineCreatedPublisher extends Publisher<CuisineCreatedEvent> {
  subject: Subjects.CuisineCreated = Subjects.CuisineCreated;
}
