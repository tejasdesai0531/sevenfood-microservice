import { Publisher, Subjects, RestaurantTypeUpdatedEvent } from '@sevenfood/common';

export class RestaurantTypeUpdatedPublisher extends Publisher<RestaurantTypeUpdatedEvent> {
  subject: Subjects.RestaurantTypeUpdated = Subjects.RestaurantTypeUpdated;
}
