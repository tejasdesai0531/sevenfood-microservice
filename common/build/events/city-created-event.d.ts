import { Subjects } from './subjects';
export interface CityCreatedEvent {
    subject: Subjects.CityCreated;
    data: {
        id: string;
        name: string;
        code: string;
        status: boolean;
    };
}
