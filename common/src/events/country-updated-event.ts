import { Subjects } from './subjects';

export interface CountryUpdatedEvent {
  subject: Subjects.CountryUpdated;
  data: {
    id: string;
    name: string;
    code: string;
    status: boolean;
  };
}
