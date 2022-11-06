import { Subjects } from './subjects';

export interface ItemVisibilityUpdatedEvent {
  subject: Subjects.ItemVisibilityUpdated;
  data: {
    id: string;
    categoryId: string,
    subcategoryId: string,
    outletId: string,
    visibility: boolean
  };
}
