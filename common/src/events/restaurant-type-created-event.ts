import { Subjects } from './subjects';

export interface RestaurantTypeCreatedEvent {
  subject: Subjects.RestaurantTypeCreated;
  data: {
    id: string;
    name: string;
    code: string;
    status: boolean;
  };
}
