import { Publisher, Subjects, OutletCreatedEvent } from '@sevenfood/common';

export class OutletCreatedPublisher extends Publisher<OutletCreatedEvent> {
  subject: Subjects.OutletCreated = Subjects.OutletCreated;
}
