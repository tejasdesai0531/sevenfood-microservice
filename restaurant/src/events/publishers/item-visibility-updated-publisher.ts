import { Publisher, Subjects, ItemVisibilityUpdatedEvent } from '@sevenfood/common';

export class ItemVisibilityUpdatedPublisher extends Publisher<ItemVisibilityUpdatedEvent> {
  subject: Subjects.ItemVisibilityUpdated = Subjects.ItemVisibilityUpdated;
}
