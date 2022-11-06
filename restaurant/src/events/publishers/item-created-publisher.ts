import { Publisher, Subjects, ItemCreatedEvent } from '@sevenfood/common';

export class ItemCreatedPublisher extends Publisher<ItemCreatedEvent> {
  subject: Subjects.ItemCreated = Subjects.ItemCreated;
}
