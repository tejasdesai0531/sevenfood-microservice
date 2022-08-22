import { Subjects } from './subjects';

export interface CityUpdatedEvent {
  subject: Subjects.CityUpdated;
  data: {
    id: string;
    name: string;
    code: string;
    status: boolean;
  };
}
