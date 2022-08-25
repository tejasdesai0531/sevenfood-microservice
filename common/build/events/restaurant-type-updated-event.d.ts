import { Subjects } from './subjects';
export interface RestaurantTypeUpdatedEvent {
    subject: Subjects.RestaurantTypeUpdated;
    data: {
        id: string;
        name: string;
        code: string;
        status: boolean;
    };
}
