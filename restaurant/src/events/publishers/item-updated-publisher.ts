import { Publisher, Subjects, ItemUpdatedEvent } from '@sevenfood/common';

export class ItemUpdatedPublisher extends Publisher<ItemUpdatedEvent> {
  subject: Subjects.ItemUpdated = Subjects.ItemUpdated;
}
