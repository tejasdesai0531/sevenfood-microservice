import { Subjects } from './subjects';
export interface CuisineUpdatedEvent {
    subject: Subjects.CuisineUpdated;
    data: {
        id: string;
        name: string;
        code: string;
        status: boolean;
    };
}
