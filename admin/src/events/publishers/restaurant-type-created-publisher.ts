import { Publisher, Subjects, RestaurantTypeCreatedEvent } from '@sevenfood/common';

export class RestaurantTypeCreatedPublisher extends Publisher<RestaurantTypeCreatedEvent> {
  subject: Subjects.RestaurantTypeCreated = Subjects.RestaurantTypeCreated;
}
