import { Subjects } from './subjects';
export interface CountryCreatedEvent {
    subject: Subjects.CountryCreated;
    data: {
        id: string;
        name: string;
        code: string;
        status: boolean;
    };
}
