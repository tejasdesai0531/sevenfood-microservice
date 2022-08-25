import { Subjects } from './subjects';
export interface CuisineCreatedEvent {
    subject: Subjects.CuisineCreated;
    data: {
        id: string;
        name: string;
        code: string;
        status: boolean;
    };
}
