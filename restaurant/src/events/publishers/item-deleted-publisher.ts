import { Publisher, Subjects, ItemDeletedEvent } from '@sevenfood/common';

export class ItemDeletedPublisher extends Publisher<ItemDeletedEvent> {
  subject: Subjects.ItemDeleted = Subjects.ItemDeleted;
}
